const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Product = require('../models/Product');
const { auth, adminOnly, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
    query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be positive'),
    query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be positive'),
  ],
  optionalAuth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const skip = (page - 1) * limit;

      // Build query
      let query = { isActive: true };

      // Filter by category
      if (req.query.category) {
        query.category = req.query.category;
      }

      // Filter by price range
      if (req.query.minPrice || req.query.maxPrice) {
        query.price = {};
        if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
        if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
      }

      // Filter by tags
      if (req.query.tags) {
        const tags = req.query.tags.split(',').map(tag => tag.trim());
        query.tags = { $in: tags };
      }

      // Filter by technologies
      if (req.query.technologies) {
        const techs = req.query.technologies.split(',').map(tech => tech.trim());
        query.technologies = { $in: techs };
      }

      // Search functionality
      if (req.query.search) {
        query.$text = { $search: req.query.search };
      }

      // Featured products only
      if (req.query.featured === 'true') {
        query.isFeatured = true;
      }

      // Build sort object
      let sort = {};
      switch (req.query.sort) {
        case 'price_low':
          sort = { price: 1 };
          break;
        case 'price_high':
          sort = { price: -1 };
          break;
        case 'rating':
          sort = { 'rating.average': -1 };
          break;
        case 'popular':
          sort = { sales: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }

      // Execute query
      const products = await Product.find(query)
        .populate('createdBy', 'name email')
        .select('-reviews') // Exclude reviews for performance
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await Product.countDocuments(query);
      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: {
          products,
          pagination: {
            currentPage: page,
            totalPages,
            totalProducts: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
      });
    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching products',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name email avatar')
      .populate('reviews.user', 'name avatar');

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Increment views (only if not the creator)
    if (!req.user || req.user._id.toString() !== product.createdBy._id.toString()) {
      await product.incrementViews();
    }

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    console.error('Get product error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin only)
router.post(
  '/',
  adminOnly,
  [
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
    body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('shortDescription').trim().isLength({ min: 10, max: 300 }).withMessage('Short description must be between 10 and 300 characters'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').isIn(['Web Applications', 'Mobile Apps', 'E-commerce', 'Landing Pages', 'Backend APIs', 'UI/UX Design', 'Custom Development', 'Consulting', 'Other']).withMessage('Invalid category'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const productData = {
        ...req.body,
        createdBy: req.user._id,
      };

      const product = new Product(productData);
      await product.save();

      await product.populate('createdBy', 'name email');

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: { product },
      });
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
router.put(
  '/:id',
  adminOnly,
  [
    body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be less than 200 characters'),
    body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('shortDescription').optional().trim().isLength({ min: 10, max: 300 }).withMessage('Short description must be between 10 and 300 characters'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').optional().isIn(['Web Applications', 'Mobile Apps', 'E-commerce', 'Landing Pages', 'Backend APIs', 'UI/UX Design', 'Custom Development', 'Consulting', 'Other']).withMessage('Invalid category'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('createdBy', 'name email');

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.json({
        success: true,
        message: 'Product updated successfully',
        data: { product },
      });
    } catch (error) {
      console.error('Update product error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error updating product',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
router.post(
  '/:id/reviews',
  auth,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment must be less than 500 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);

      if (!product || !product.isActive) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      // Check if user already reviewed this product
      const existingReview = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
      );

      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this product',
        });
      }

      // Add review
      product.reviews.push({
        user: req.user._id,
        rating,
        comment,
      });

      // Update rating
      await product.updateRating();

      await product.populate('reviews.user', 'name avatar');

      res.status(201).json({
        success: true,
        message: 'Review added successfully',
        data: { product },
      });
    } catch (error) {
      console.error('Add review error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error adding review',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get product categories
// @route   GET /api/products/categories/list
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = [
      'Web Applications',
      'Mobile Apps',
      'E-commerce',
      'Landing Pages',
      'Backend APIs',
      'UI/UX Design',
      'Custom Development',
      'Consulting',
      'Other'
    ];

    res.json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
    });
  }
});

module.exports = router;