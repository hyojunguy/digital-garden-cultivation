const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
  host: '169.211.254.16',
  user: 'loop',      // Replace with your MySQL username
  password: 'loopailabs',  // Replace with your MySQL password
  database: 'digital_garden',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'  // Support for Korean characters
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};