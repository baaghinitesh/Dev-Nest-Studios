const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create subdirectories based on file type
    let subDir = 'general';
    
    if (file.fieldname === 'productImages') {
      subDir = 'products';
    } else if (file.fieldname === 'avatar') {
      subDir = 'avatars';
    } else if (file.fieldname === 'attachments') {
      subDir = 'attachments';
    } else if (file.fieldname === 'deliveryFiles') {
      subDir = 'deliveries';
    }

    const fullPath = path.join(uploadDir, subDir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type based on field name
  if (file.fieldname === 'productImages' || file.fieldname === 'avatar') {
    // Only allow images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for this field'), false);
    }
  } else if (file.fieldname === 'attachments' || file.fieldname === 'deliveryFiles') {
    // Allow various file types for attachments
    const allowedTypes = [
      'image/', 'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip', 'application/x-zip-compressed',
      'text/plain', 'application/json'
    ];
    
    if (allowedTypes.some(type => file.mimetype.startsWith(type) || file.mimetype === type)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  } else {
    cb(new Error('Unknown field name'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files at once
  }
});

// Middleware for different upload scenarios
const uploadMiddleware = {
  // Single file upload
  single: (fieldName) => upload.single(fieldName),
  
  // Multiple files with same field name
  array: (fieldName, maxCount = 5) => upload.array(fieldName, maxCount),
  
  // Multiple files with different field names
  fields: (fields) => upload.fields(fields),
  
  // Product images (up to 5 images)
  productImages: upload.array('productImages', 5),
  
  // User avatar (single image)
  avatar: upload.single('avatar'),
  
  // Message attachments (up to 3 files)
  messageAttachments: upload.array('attachments', 3),
  
  // Order delivery files (up to 10 files)
  deliveryFiles: upload.array('deliveryFiles', 10),
  
  // Mixed uploads for products (images + other files)
  productUpload: upload.fields([
    { name: 'productImages', maxCount: 5 },
    { name: 'attachments', maxCount: 3 }
  ])
};

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 10MB per file.'
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum allowed varies by field.'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          message: 'Unexpected field name in file upload.'
        });
      default:
        return res.status(400).json({
          success: false,
          message: 'File upload error: ' + error.message
        });
    }
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'File upload failed'
    });
  }
  next();
};

// Helper function to get file URL
const getFileUrl = (req, filename, subDir = 'general') => {
  const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/uploads/${subDir}/${filename}`;
};

// Helper function to delete files
const deleteFiles = (filePaths) => {
  filePaths.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', filePath, error);
    }
  });
};

// Helper function to process uploaded files
const processUploadedFiles = (req, files, subDir = 'general') => {
  if (!files || files.length === 0) return [];
  
  return files.map(file => ({
    name: file.originalname,
    filename: file.filename,
    url: getFileUrl(req, file.filename, subDir),
    size: file.size,
    type: file.mimetype,
    path: file.path
  }));
};

module.exports = {
  uploadMiddleware,
  handleUploadError,
  getFileUrl,
  deleteFiles,
  processUploadedFiles
};