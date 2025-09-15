const express = require('express');
const { body, validationResult, query } = require('express-validator');
const User = require('../models/User');
const Order = require('../models/Order');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin only)
router.get(
  '/',
  adminOnly,
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
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      let query = {};

      // Search functionality
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query.$or = [
          { name: searchRegex },
          { email: searchRegex },
        ];
      }

      // Filter by role
      if (req.query.role) {
        query.role = req.query.role;
      }

      // Filter by verification status
      if (req.query.isVerified !== undefined) {
        query.isVerified = req.query.isVerified === 'true';
      }

      const users = await User.find(query)
        .select('-password -resetPasswordToken -resetPasswordExpire')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await User.countDocuments(query);
      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            currentPage: page,
            totalPages,
            totalUsers: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get single user (Admin only)
// @route   GET /api/users/:id
// @access  Private (Admin only)
router.get('/:id', adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -resetPasswordToken -resetPasswordExpire');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get user's order statistics
    const orderStats = await Order.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          completedOrders: {
            $sum: {
              $cond: [{ $in: ['$status', ['completed', 'delivered']] }, 1, 0]
            }
          },
        }
      }
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      completedOrders: 0,
    };

    res.json({
      success: true,
      data: {
        user,
        stats,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Update user role (Admin only)
// @route   PUT /api/users/:id/role
// @access  Private (Admin only)
router.put(
  '/:id/role',
  adminOnly,
  [
    body('role').isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
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

      const { role } = req.body;
      
      const user = await User.findById(req.params.id)
        .select('-password -resetPasswordToken -resetPasswordExpire');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // Prevent admin from changing their own role
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: 'You cannot change your own role',
        });
      }

      user.role = role;
      await user.save();

      res.json({
        success: true,
        message: `User role updated to ${role} successfully`,
        data: { user },
      });
    } catch (error) {
      console.error('Update user role error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error updating user role',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Update user verification status (Admin only)
// @route   PUT /api/users/:id/verify
// @access  Private (Admin only)
router.put(
  '/:id/verify',
  adminOnly,
  [
    body('isVerified').isBoolean().withMessage('isVerified must be a boolean'),
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

      const { isVerified } = req.body;
      
      const user = await User.findById(req.params.id)
        .select('-password -resetPasswordToken -resetPasswordExpire');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      user.isVerified = isVerified;
      await user.save();

      res.json({
        success: true,
        message: `User verification status updated successfully`,
        data: { user },
      });
    } catch (error) {
      console.error('Update user verification error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error updating user verification',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      });
    }

    // Check if user has orders
    const orderCount = await Order.countDocuments({ user: user._id });
    if (orderCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with existing orders. Please handle orders first.',
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats/overview
// @access  Private (Admin only)
router.get('/stats/overview', adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    
    // Get user registration stats for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get user registration trend (last 7 days)
    const registrationTrend = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get top customers by spending
    const topCustomers = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { 
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          name: '$user.name',
          email: '$user.email',
          totalSpent: 1,
          orderCount: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        verifiedUsers,
        adminUsers,
        recentRegistrations,
        registrationTrend,
        topCustomers,
      },
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;