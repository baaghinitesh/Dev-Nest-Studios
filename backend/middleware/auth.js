const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Protect routes - require authentication
const protect = passport.authenticate('jwt', { session: false });

// Custom authentication middleware for more control
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token. User not found.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired. Please login again.' 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: 'Invalid token.' 
    });
  }
};

// Authorization middleware - check user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    next();
  };
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    // Silently fail for optional auth
    console.log('Optional auth failed:', error.message);
  }
  
  next();
};

// Admin only middleware
const adminOnly = [auth, authorize('admin')];

// Check if user owns resource or is admin
const ownerOrAdmin = (resourceUserField = 'user') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admin can access anything
      if (req.user.role === 'admin') {
        return next();
      }

      // For routes that have the resource in params
      if (req.params.id) {
        const Model = req.model; // Set this in route if using this pattern
        if (Model) {
          const resource = await Model.findById(req.params.id);
          if (!resource) {
            return res.status(404).json({
              success: false,
              message: 'Resource not found'
            });
          }

          const resourceOwnerId = resource[resourceUserField]?.toString() || resource[resourceUserField];
          if (resourceOwnerId !== req.user._id.toString()) {
            return res.status(403).json({
              success: false,
              message: 'Access denied. You can only access your own resources.'
            });
          }
        }
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Authorization check failed',
        error: error.message
      });
    }
  };
};

// Rate limiting helper
const createRateLimit = (windowMs, max, message) => {
  const attempts = new Map();
  
  return (req, res, next) => {
    const key = req.ip + (req.user?._id || '');
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [attemptKey, timestamp] of attempts.entries()) {
      if (timestamp < windowStart) {
        attempts.delete(attemptKey);
      }
    }
    
    // Count attempts in window
    let count = 0;
    for (const [attemptKey, timestamp] of attempts.entries()) {
      if (attemptKey.startsWith(key) && timestamp >= windowStart) {
        count++;
      }
    }
    
    if (count >= max) {
      return res.status(429).json({
        success: false,
        message: message || 'Too many attempts. Please try again later.'
      });
    }
    
    attempts.set(`${key}-${now}`, now);
    next();
  };
};

// Login rate limiting
const loginRateLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many login attempts. Please try again in 15 minutes.'
);

module.exports = {
  generateToken,
  protect,
  auth,
  authorize,
  optionalAuth,
  adminOnly,
  ownerOrAdmin,
  loginRateLimit,
  createRateLimit,
};