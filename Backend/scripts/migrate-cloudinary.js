const pool = require('../config/database');

/**
 * Migration: Alter products.image_url from VARCHAR(500) to TEXT
 * Cloudinary URLs can be longer; TEXT ensures compatibility.
 */
async function migrate() {
  try {
    await pool.query(`
      ALTER TABLE products
      ALTER COLUMN image_url TYPE TEXT;
    `);
    console.log('Migration successful: image_url column updated to TEXT');
    process.exit(0);
  } catch (error) {
    if (error.message && error.message.includes('type "text"')) {
      console.log('Column may already be TEXT. Skipping.');
      process.exit(0);
    }
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
