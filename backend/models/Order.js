const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
      },
      price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
      },
      customizationRequests: {
        type: String,
        maxlength: [1000, 'Customization requests cannot exceed 1000 characters'],
      },
      deliveryPreferences: {
        type: String,
        maxlength: [500, 'Delivery preferences cannot exceed 500 characters'],
      },
    }],
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative'],
    },
    tax: {
      type: Number,
      default: 0,
      min: [0, 'Tax cannot be negative'],
    },
    shipping: {
      type: Number,
      default: 0,
      min: [0, 'Shipping cost cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'INR'],
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'processing',
        'in_development',
        'testing',
        'completed',
        'delivered',
        'cancelled',
        'refunded'
      ],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'bank_transfer', 'crypto', 'other'],
      required: true,
    },
    paymentDetails: {
      transactionId: String,
      paymentIntentId: String,
      last4: String,
      brand: String,
    },
    billingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    deliveryAddress: {
      name: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    timeline: [{
      status: {
        type: String,
        required: true,
      },
      description: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }],
    notes: [{
      content: {
        type: String,
        required: true,
        maxlength: [1000, 'Note cannot exceed 1000 characters'],
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      isInternal: {
        type: Boolean,
        default: false, // false = visible to customer, true = internal only
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    estimatedDelivery: {
      type: Date,
    },
    actualDelivery: {
      type: Date,
    },
    deliveryFiles: [{
      name: { type: String, required: true },
      url: { type: String, required: true },
      size: Number,
      type: String,
      uploadedAt: { type: Date, default: Date.now },
    }],
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        maxlength: [1000, 'Feedback comment cannot exceed 1000 characters'],
      },
      submittedAt: Date,
    },
    refundDetails: {
      reason: String,
      amount: Number,
      processedAt: Date,
      refundId: String,
    },
    metadata: {
      source: { type: String, default: 'web' }, // web, mobile, api
      userAgent: String,
      ipAddress: String,
      referrer: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `DN${String(count + 1).padStart(6, '0')}`;
    
    // Add initial timeline entry
    this.timeline.push({
      status: this.status,
      description: 'Order created',
      timestamp: new Date(),
    });
  }
  next();
});

// Method to update status and add timeline entry
orderSchema.methods.updateStatus = function (newStatus, description, updatedBy) {
  this.status = newStatus;
  this.timeline.push({
    status: newStatus,
    description: description || `Status updated to ${newStatus}`,
    timestamp: new Date(),
    updatedBy: updatedBy,
  });
  return this.save();
};

// Method to add note
orderSchema.methods.addNote = function (content, author, isInternal = false) {
  this.notes.push({
    content,
    author,
    isInternal,
    createdAt: new Date(),
  });
  return this.save();
};

// Method to calculate totals
orderSchema.methods.calculateTotals = function () {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.total = this.subtotal + this.tax + this.shipping - this.discount;
  return this;
};

// Virtual for order age
orderSchema.virtual('orderAge').get(function () {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for is overdue (estimated delivery passed)
orderSchema.virtual('isOverdue').get(function () {
  if (!this.estimatedDelivery || this.status === 'delivered' || this.status === 'completed') {
    return false;
  }
  return new Date() > this.estimatedDelivery;
});

orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);