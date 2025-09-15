const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [300, 'Short description cannot be more than 300 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Web Applications',
        'Mobile Apps',
        'E-commerce',
        'Landing Pages',
        'Backend APIs',
        'UI/UX Design',
        'Custom Development',
        'Consulting',
        'Other'
      ],
    },
    tags: [{
      type: String,
      trim: true,
    }],
    features: [{
      title: { type: String, required: true },
      description: { type: String },
      included: { type: Boolean, default: true },
    }],
    technologies: [{
      type: String,
      trim: true,
    }],
    images: [{
      url: { type: String, required: true },
      alt: { type: String, default: '' },
      isPrimary: { type: Boolean, default: false },
    }],
    demoUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    downloadUrl: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: null, // null means unlimited
      min: [0, 'Stock cannot be negative'],
    },
    deliveryTime: {
      type: String,
      default: '3-7 business days',
    },
    customizationOptions: {
      available: { type: Boolean, default: true },
      description: { type: String },
      additionalCost: { type: Number, default: 0 },
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate',
    },
    supportIncluded: {
      type: Boolean,
      default: true,
    },
    supportDuration: {
      type: String,
      default: '30 days',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sales: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    reviews: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, maxlength: 500 },
      createdAt: { type: Date, default: Date.now },
    }],
    seoMetadata: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ price: 1 });
productSchema.index({ 'rating.average': -1 });

// Calculate discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Check if product is on sale
productSchema.virtual('isOnSale').get(function () {
  return this.originalPrice && this.originalPrice > this.price;
});

// Update rating when new review is added
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.rating.count = this.reviews.length;
  }
  return this.save();
};

// Increment views
productSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Increment sales
productSchema.methods.incrementSales = function (quantity = 1) {
  this.sales += quantity;
  return this.save();
};

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);