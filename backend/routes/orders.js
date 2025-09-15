const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post(
  '/',
  auth,
  [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.product').isMongoId().withMessage('Valid product ID is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('paymentMethod').isIn(['card', 'paypal', 'bank_transfer', 'crypto', 'other']).withMessage('Invalid payment method'),
    body('billingAddress.name').trim().notEmpty().withMessage('Billing name is required'),
    body('billingAddress.email').isEmail().withMessage('Valid billing email is required'),
    body('billingAddress.street').trim().notEmpty().withMessage('Billing street is required'),
    body('billingAddress.city').trim().notEmpty().withMessage('Billing city is required'),
    body('billingAddress.state').trim().notEmpty().withMessage('Billing state is required'),
    body('billingAddress.zipCode').trim().notEmpty().withMessage('Billing zip code is required'),
    body('billingAddress.country').trim().notEmpty().withMessage('Billing country is required'),
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

      const { items, paymentMethod, billingAddress, deliveryAddress, metadata } = req.body;

      // Validate products and calculate prices
      const orderItems = [];
      let subtotal = 0;

      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product || !product.isActive) {
          return res.status(400).json({
            success: false,
            message: `Product ${item.product} not found or inactive`,
          });
        }

        // Check stock if applicable
        if (product.stock !== null && product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.title}`,
          });
        }

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price,
          customizationRequests: item.customizationRequests || '',
          deliveryPreferences: item.deliveryPreferences || '',
        });

        // Update product stock if applicable
        if (product.stock !== null) {
          product.stock -= item.quantity;
          await product.save();
        }

        // Increment sales
        await product.incrementSales(item.quantity);
      }

      // Calculate totals (simplified - you might want to add tax calculation)
      const tax = subtotal * 0.1; // 10% tax example
      const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
      const discount = req.body.discount || 0;
      const total = subtotal + tax + shipping - discount;

      // Set estimated delivery (7 days from now)
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

      // Create order
      const order = new Order({
        user: req.user._id,
        items: orderItems,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        paymentMethod,
        billingAddress,
        deliveryAddress: deliveryAddress || billingAddress,
        estimatedDelivery,
        metadata: {
          source: 'web',
          userAgent: req.get('User-Agent'),
          ipAddress: req.ip,
          ...metadata,
        },
      });

      await order.save();

      // Populate product details
      await order.populate('items.product', 'title price category images');
      await order.populate('user', 'name email');

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: { order },
      });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating order',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
router.get(
  '/',
  auth,
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
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

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let query = {};
      
      // For non-admin users, only show their orders
      if (req.user.role !== 'admin') {
        query.user = req.user._id;
      }

      // Filter by status
      if (req.query.status) {
        query.status = req.query.status;
      }

      const orders = await Order.find(query)
        .populate('items.product', 'title price category images')
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Order.countDocuments(query);
      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: {
          orders,
          pagination: {
            currentPage: page,
            totalPages,
            totalOrders: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
      });
    } catch (error) {
      console.error('Get orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching orders',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    // For non-admin users, only show their orders
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    const order = await Order.findOne(query)
      .populate('items.product', 'title price category images demoUrl')
      .populate('user', 'name email phone')
      .populate('timeline.updatedBy', 'name')
      .populate('notes.author', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    console.error('Get order error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin only)
router.put(
  '/:id/status',
  adminOnly,
  [
    body('status').isIn(['pending', 'confirmed', 'processing', 'in_development', 'testing', 'completed', 'delivered', 'cancelled', 'refunded']).withMessage('Invalid status'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
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

      const { status, description } = req.body;
      
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      // Update status using the model method
      await order.updateStatus(status, description, req.user._id);

      // If delivered, set actual delivery date
      if (status === 'delivered' && !order.actualDelivery) {
        order.actualDelivery = new Date();
        await order.save();
      }

      await order.populate('items.product', 'title price category');
      await order.populate('user', 'name email');

      res.json({
        success: true,
        message: 'Order status updated successfully',
        data: { order },
      });
    } catch (error) {
      console.error('Update order status error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error updating order status',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Add note to order
// @route   POST /api/orders/:id/notes
// @access  Private (Admin or Order Owner)
router.post(
  '/:id/notes',
  auth,
  [
    body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('Note content is required and must be less than 1000 characters'),
    body('isInternal').optional().isBoolean().withMessage('isInternal must be a boolean'),
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

      let query = { _id: req.params.id };
      
      // For non-admin users, only allow notes on their orders
      if (req.user.role !== 'admin') {
        query.user = req.user._id;
      }

      const order = await Order.findOne(query);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      const { content, isInternal } = req.body;
      
      // Only admins can add internal notes
      const noteIsInternal = req.user.role === 'admin' ? (isInternal || false) : false;

      await order.addNote(content, req.user._id, noteIsInternal);
      await order.populate('notes.author', 'name');

      res.status(201).json({
        success: true,
        message: 'Note added successfully',
        data: { order },
      });
    } catch (error) {
      console.error('Add order note error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error adding note',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Submit order feedback
// @route   POST /api/orders/:id/feedback
// @access  Private (Order Owner only)
router.post(
  '/:id/feedback',
  auth,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim().isLength({ max: 1000 }).withMessage('Comment must be less than 1000 characters'),
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

      const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      // Check if order is completed/delivered
      if (!['completed', 'delivered'].includes(order.status)) {
        return res.status(400).json({
          success: false,
          message: 'Feedback can only be submitted for completed or delivered orders',
        });
      }

      // Check if feedback already exists
      if (order.feedback.rating) {
        return res.status(400).json({
          success: false,
          message: 'Feedback has already been submitted for this order',
        });
      }

      const { rating, comment } = req.body;
      
      order.feedback = {
        rating,
        comment,
        submittedAt: new Date(),
      };

      await order.save();

      res.json({
        success: true,
        message: 'Feedback submitted successfully',
        data: { order },
      });
    } catch (error) {
      console.error('Submit feedback error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error submitting feedback',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get order statistics (Admin only)
// @route   GET /api/orders/stats/overview
// @access  Private (Admin only)
router.get('/stats/overview', adminOnly, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: { $in: ['completed', 'delivered'] } });
    
    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber user total status createdAt');

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
        recentOrders,
      },
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;