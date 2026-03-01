const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const verifyAdmin = require('../middleware/adminAuth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

// GET all products
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];
    
    if (category) {
      query += ' WHERE category_id = $1';
      params.push(category);
    }
    
    if (search) {
      query += category ? ' AND' : ' WHERE';
      query += ' (name ILIKE $' + (params.length + 1) + ' OR description ILIKE $' + (params.length + 1) + ')';
      params.push(`%${search}%`);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create new product (admin only)
router.post('/', verifyAdmin, upload.single('image'), async (req, res, next) => {
  try {
    const { name, description, price, category_id, stock_quantity, scent, size } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Product image is required.' });
    }

    console.log('[POST /products] Uploading to Cloudinary, buffer size:', req.file.buffer?.length);

    // Upload image to Cloudinary (uses memory buffer - no temp file)
    let image_url;
    try {
      image_url = await uploadToCloudinary(req.file.buffer);
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      const errMsg = uploadError.message || uploadError.error?.message || 'Failed to upload image';
      return res.status(500).json({
        error: errMsg,
        details: uploadError.error || uploadError.http_code,
      });
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price, category_id, stock_quantity, image_url, scent, size, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [name, description, price, category_id || null, stock_quantity, image_url, scent, size]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    next(error);
  }
});

// PUT update product (admin only)
router.put('/:id', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, stock_quantity, scent, size } = req.body;

    let image_url = null;
    if (req.file) {
      try {
        image_url = await uploadToCloudinary(req.file.buffer);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({
          error: 'Failed to upload image to cloud storage.',
          details: uploadError.message,
        });
      }
    }

    let query;
    const params = [name, description, price, category_id, stock_quantity, scent, size];

    if (image_url) {
      query = `UPDATE products SET 
        name = $1, description = $2, price = $3, category_id = $4, 
        stock_quantity = $5, scent = $6, size = $7, image_url = $8
        WHERE id = $9 RETURNING *`;
      params.push(image_url, id);
    } else {
      query = `UPDATE products SET 
        name = $1, description = $2, price = $3, category_id = $4, 
        stock_quantity = $5, scent = $6, size = $7
        WHERE id = $8 RETURNING *`;
      params.push(id);
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;

