const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Upload image buffer to Cloudinary.
 * @param {Buffer} buffer - Image file buffer from multer
 * @param {string} [folder='esscentials'] - Cloudinary folder for organization
 * @returns {Promise<string>} - Secure URL of uploaded image
 */
async function uploadToCloudinary(buffer, folder = 'esscentials') {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error('Invalid buffer: expected a Buffer from multer');
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary environment variables are not set (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result || !result.secure_url) {
          return reject(new Error('Cloudinary upload failed: no secure_url returned'));
        }
        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

module.exports = { uploadToCloudinary };
