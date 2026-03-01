const jwt = require('jsonwebtoken');

/**
 * Middleware to verify admin JWT and restrict access to admin-only routes.
 */
function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (!token || scheme !== 'Bearer') {
      return res.status(401).json({ error: 'Authentication token missing.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not set in environment variables');
      return res
        .status(500)
        .json({ error: 'Authentication is not configured correctly.' });
    }

    const decoded = jwt.verify(token, secret);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    // Attach admin info to request for downstream handlers.
    req.admin = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired. Please log in again.' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }

    return res.status(500).json({ error: 'Failed to authenticate request.' });
  }
}

module.exports = verifyAdmin;

