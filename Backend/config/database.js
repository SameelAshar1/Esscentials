const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to Neon PostgreSQL");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(1);
});

module.exports = pool;
