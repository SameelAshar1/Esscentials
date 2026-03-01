const { Pool } = require("pg");

let pool;

if (process.env.NODE_ENV === "production") {
  // Production → Use Neon DATABASE_URL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Development → Use Local PostgreSQL
  pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "candle_store",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
}

// Test connection
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();

module.exports = pool;
