const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');

/**
 * Handle admin login and JWT issuance.
 */
async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const admin = await AdminModel.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const passwordMatches = await bcrypt.compare(password, admin.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const payload = {
      id: admin.id,
      role: admin.role || 'admin',
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not set in environment variables');
      return res
        .status(500)
        .json({ error: 'Authentication is not configured correctly.' });
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: '1d', // 1 day expiry as required
    });

    return res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginAdmin,
};

