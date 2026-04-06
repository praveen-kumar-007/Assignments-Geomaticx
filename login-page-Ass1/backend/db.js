const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_mysql_password",
  database: process.env.DB_NAME || "login_ass1",
  connectionLimit: 10,
};

const pool = mysql.createPool(dbConfig);

// Ensure the core users table exists so new environments do not crash on first insert.
const ensureUsersTableSql = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    school_name VARCHAR(255),
    gender VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

pool.query(ensureUsersTableSql, (err) => {
  if (err) {
    console.error("Failed to ensure users table exists:", err);
  } else {
    console.log("Users table ready");
  }
});

module.exports = pool;
