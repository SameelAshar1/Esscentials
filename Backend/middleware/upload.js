const multer = require('multer');
const path = require('path');

/**
 * Multer memory storage - stores file in memory as Buffer.
 * Used for Cloudinary uploads (no temp file on disk).
 * Buffer is passed to Cloudinary and garbage-collected after request.
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp).'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

module.exports = upload;
