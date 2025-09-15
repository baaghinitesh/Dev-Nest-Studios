const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['contact', 'hire', 'support', 'feedback', 'consultation'],
      required: [true, 'Message type is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'in_progress', 'responded', 'resolved', 'closed'],
      default: 'new',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // For hire requests
    projectDetails: {
      budget: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'USD' },
      },
      timeline: {
        type: String,
        maxlength: [100, 'Timeline cannot exceed 100 characters'],
      },
      projectType: {
        type: String,
        enum: [
          'Web Development',
          'Mobile App Development',
          'E-commerce Solution',
          'Custom Software',
          'UI/UX Design',
          'API Development',
          'Database Design',
          'DevOps & Deployment',
          'Consultation',
          'Other'
        ],
      },
      requirements: {
        type: String,
        maxlength: [1000, 'Requirements cannot exceed 1000 characters'],
      },
      technologies: [{
        type: String,
        trim: true,
      }],
      features: [{
        type: String,
        trim: true,
      }],
      deliverables: [{
        type: String,
        trim: true,
      }],
      attachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: Number,
        type: String,
      }],
    },
    // For support requests
    supportDetails: {
      orderNumber: {
        type: String,
        trim: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      issueType: {
        type: String,
        enum: [
          'Technical Issue',
          'Bug Report',
          'Feature Request',
          'Installation Help',
          'Customization Request',
          'Documentation',
          'Other'
        ],
      },
      urgency: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium',
      },
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    responses: [{
      content: {
        type: String,
        required: true,
        maxlength: [2000, 'Response cannot exceed 2000 characters'],
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      isInternal: {
        type: Boolean,
        default: false, // false = sent to customer, true = internal note
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      attachments: [{
        name: String,
        url: String,
        size: Number,
        type: String,
      }],
    }],
    metadata: {
      source: { type: String, default: 'web' }, // web, email, phone, chat
      userAgent: String,
      ipAddress: String,
      referrer: String,
      utm: {
        source: String,
        medium: String,
        campaign: String,
        term: String,
        content: String,
      },
    },
    readAt: {
      type: Date,
    },
    respondedAt: {
      type: Date,
    },
    resolvedAt: {
      type: Date,
    },
    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        maxlength: [500, 'Rating comment cannot exceed 500 characters'],
      },
      submittedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
messageSchema.index({ type: 1, status: 1 });
messageSchema.index({ email: 1 });
messageSchema.index({ status: 1, createdAt: -1 });
messageSchema.index({ assignedTo: 1 });
messageSchema.index({ 'projectDetails.projectType': 1 });
messageSchema.index({ createdAt: -1 });

// Update status timestamps
messageSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    switch (this.status) {
      case 'read':
        if (!this.readAt) this.readAt = new Date();
        break;
      case 'responded':
        if (!this.respondedAt) this.respondedAt = new Date();
        break;
      case 'resolved':
      case 'closed':
        if (!this.resolvedAt) this.resolvedAt = new Date();
        break;
    }
  }
  next();
});

// Method to add response
messageSchema.methods.addResponse = function (content, author, isInternal = false, attachments = []) {
  this.responses.push({
    content,
    author,
    isInternal,
    attachments,
    timestamp: new Date(),
  });
  
  // Update status if it's a customer response (not internal)
  if (!isInternal && this.status === 'new') {
    this.status = 'responded';
  }
  
  return this.save();
};

// Method to mark as read
messageSchema.methods.markAsRead = function () {
  if (this.status === 'new') {
    this.status = 'read';
  }
  return this.save();
};

// Method to assign to user
messageSchema.methods.assignTo = function (userId) {
  this.assignedTo = userId;
  if (this.status === 'new') {
    this.status = 'in_progress';
  }
  return this.save();
};

// Virtual for response time (time between creation and first response)
messageSchema.virtual('responseTime').get(function () {
  if (!this.respondedAt) return null;
  
  const created = new Date(this.createdAt);
  const responded = new Date(this.respondedAt);
  const diffHours = Math.abs(responded - created) / (1000 * 60 * 60);
  return Math.round(diffHours * 100) / 100; // Round to 2 decimal places
});

// Virtual for resolution time
messageSchema.virtual('resolutionTime').get(function () {
  if (!this.resolvedAt) return null;
  
  const created = new Date(this.createdAt);
  const resolved = new Date(this.resolvedAt);
  const diffHours = Math.abs(resolved - created) / (1000 * 60 * 60);
  return Math.round(diffHours * 100) / 100;
});

// Virtual for age in hours
messageSchema.virtual('ageInHours').get(function () {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffHours = (now - created) / (1000 * 60 * 60);
  return Math.round(diffHours * 100) / 100;
});

messageSchema.set('toJSON', { virtuals: true });
messageSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Message', messageSchema);