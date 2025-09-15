const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Message = require('../models/Message');
const { auth, adminOnly, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Create new message (contact/hire form)
// @route   POST /api/messages
// @access  Public
router.post(
  '/',
  [
    body('type').isIn(['contact', 'hire', 'support', 'feedback', 'consultation']).withMessage('Invalid message type'),
    body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').trim().isLength({ min: 1, max: 200 }).withMessage('Subject is required and must be less than 200 characters'),
    body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
    body('phone').optional().trim().isMobilePhone().withMessage('Please provide a valid phone number'),
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

      const messageData = {
        ...req.body,
        metadata: {
          source: 'web',
          userAgent: req.get('User-Agent'),
          ipAddress: req.ip,
          referrer: req.get('Referer'),
          ...req.body.metadata,
        },
      };

      const message = new Message(messageData);
      await message.save();

      res.status(201).json({
        success: true,
        message: 'Message sent successfully. We will get back to you soon!',
        data: { messageId: message._id },
      });
    } catch (error) {
      console.error('Create message error:', error);
      res.status(500).json({
        success: false,
        message: 'Error sending message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get all messages (Admin only)
// @route   GET /api/messages
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

      // Filter by type
      if (req.query.type) {
        query.type = req.query.type;
      }

      // Filter by status
      if (req.query.status) {
        query.status = req.query.status;
      }

      // Filter by priority
      if (req.query.priority) {
        query.priority = req.query.priority;
      }

      // Filter by assigned user
      if (req.query.assignedTo) {
        query.assignedTo = req.query.assignedTo;
      }

      // Search functionality
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { subject: searchRegex },
          { message: searchRegex },
          { company: searchRegex },
        ];
      }

      // Date range filter
      if (req.query.startDate || req.query.endDate) {
        query.createdAt = {};
        if (req.query.startDate) {
          query.createdAt.$gte = new Date(req.query.startDate);
        }
        if (req.query.endDate) {
          query.createdAt.$lte = new Date(req.query.endDate);
        }
      }

      const messages = await Message.find(query)
        .populate('assignedTo', 'name email')
        .populate('responses.author', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Message.countDocuments(query);
      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: {
          messages,
          pagination: {
            currentPage: page,
            totalPages,
            totalMessages: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
      });
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching messages',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Get single message (Admin only)
// @route   GET /api/messages/:id
// @access  Private (Admin only)
router.get('/:id', adminOnly, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('responses.author', 'name email')
      .populate('supportDetails.productId', 'title category');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    // Mark as read if it's new
    if (message.status === 'new') {
      await message.markAsRead();
    }

    res.json({
      success: true,
      data: { message },
    });
  } catch (error) {
    console.error('Get message error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Update message status (Admin only)
// @route   PUT /api/messages/:id/status
// @access  Private (Admin only)
router.put(
  '/:id/status',
  adminOnly,
  [
    body('status').isIn(['new', 'read', 'in_progress', 'responded', 'resolved', 'closed']).withMessage('Invalid status'),
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

      const { status } = req.body;
      
      const message = await Message.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).populate('assignedTo', 'name email');

      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }

      res.json({
        success: true,
        message: 'Message status updated successfully',
        data: { message },
      });
    } catch (error) {
      console.error('Update message status error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error updating message status',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Assign message to user (Admin only)
// @route   PUT /api/messages/:id/assign
// @access  Private (Admin only)
router.put(
  '/:id/assign',
  adminOnly,
  [
    body('userId').optional().isMongoId().withMessage('Valid user ID is required'),
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

      const { userId } = req.body;
      
      const message = await Message.findById(req.params.id);
      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }

      if (userId) {
        await message.assignTo(userId);
      } else {
        // Unassign
        message.assignedTo = null;
        await message.save();
      }

      await message.populate('assignedTo', 'name email');

      res.json({
        success: true,
        message: userId ? 'Message assigned successfully' : 'Message unassigned successfully',
        data: { message },
      });
    } catch (error) {
      console.error('Assign message error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error assigning message',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Add response to message (Admin only)
// @route   POST /api/messages/:id/responses
// @access  Private (Admin only)
router.post(
  '/:id/responses',
  adminOnly,
  [
    body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('Response content is required and must be less than 2000 characters'),
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

      const { content, isInternal, attachments } = req.body;
      
      const message = await Message.findById(req.params.id);
      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }

      await message.addResponse(content, req.user._id, isInternal || false, attachments || []);
      await message.populate('responses.author', 'name email');

      res.status(201).json({
        success: true,
        message: 'Response added successfully',
        data: { message },
      });
    } catch (error) {
      console.error('Add response error:', error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error adding response',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);

// @desc    Delete message (Admin only)
// @route   DELETE /api/messages/:id
// @access  Private (Admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Delete message error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Get message statistics (Admin only)
// @route   GET /api/messages/stats/overview
// @access  Private (Admin only)
router.get('/stats/overview', adminOnly, async (req, res) => {
  try {
    const totalMessages = await Message.countDocuments();
    const newMessages = await Message.countDocuments({ status: 'new' });
    const inProgressMessages = await Message.countDocuments({ status: 'in_progress' });
    const resolvedMessages = await Message.countDocuments({ status: { $in: ['resolved', 'closed'] } });

    // Get message distribution by type
    const messagesByType = await Message.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get response time stats
    const responseTimeStats = await Message.aggregate([
      { $match: { respondedAt: { $exists: true } } },
      {
        $project: {
          responseTimeHours: {
            $divide: [
              { $subtract: ['$respondedAt', '$createdAt'] },
              1000 * 60 * 60
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: '$responseTimeHours' },
          minResponseTime: { $min: '$responseTimeHours' },
          maxResponseTime: { $max: '$responseTimeHours' }
        }
      }
    ]);

    // Get recent messages
    const recentMessages = await Message.find()
      .select('type name subject status priority createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalMessages,
        newMessages,
        inProgressMessages,
        resolvedMessages,
        messagesByType,
        responseTimeStats: responseTimeStats[0] || null,
        recentMessages,
      },
    });
  } catch (error) {
    console.error('Get message stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching message statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;