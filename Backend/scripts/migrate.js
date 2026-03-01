const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const createTables = async () => {
  try {
    // Create categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        stock_quantity INTEGER DEFAULT 0,
        image_url VARCHAR(500),
        scent VARCHAR(100),
        size VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admins table for admin-only authentication
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample categories
    await pool.query(`
      INSERT INTO categories (name, description) 
      VALUES 
        ('Soy Candles', 'Eco-friendly soy wax candles'),
        ('Beeswax Candles', 'Natural beeswax candles'),
        ('Scented Candles', 'Aromatherapy scented candles'),
        ('Decorative Candles', 'Beautiful decorative candles')
      ON CONFLICT (name) DO NOTHING
    `);

    // Optionally seed an initial admin if credentials are provided via env
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await pool.query(
        `
        INSERT INTO admins (email, password, role)
        VALUES ($1, $2, 'admin')
        ON CONFLICT (email) DO NOTHING
      `,
        [process.env.ADMIN_EMAIL, hashedPassword]
      );
      console.log('Admin user ensured in database for', process.env.ADMIN_EMAIL);
    } else {
      console.log(
        'No ADMIN_EMAIL/ADMIN_PASSWORD provided. You can create admins manually in the database.'
      );
    }

    console.log('Database tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
};

createTables();




