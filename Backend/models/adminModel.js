const pool = require('../config/database');

/**
 * Admin model helpers using PostgreSQL.
 */
const AdminModel = {
  /**
   * Find admin by email.
   * @param {string} email
   * @returns {Promise<object|null>}
   */
  async findByEmail(email) {
    const result = await pool.query(
      'SELECT id, email, password, role FROM admins WHERE email = $1 LIMIT 1',
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  },
};

module.exports = AdminModel;

