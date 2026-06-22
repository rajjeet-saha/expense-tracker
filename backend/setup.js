const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

db.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    return;
  }

  db.query(`CREATE DATABASE IF NOT EXISTS expense_tracker`, (err) => {
    if (err) throw err;
    console.log('Database created');

    db.query(`USE expense_tracker`, (err) => {
      if (err) throw err;

      db.query(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          description VARCHAR(255) NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          type ENUM('income', 'expense') NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) throw err;
        console.log('Transactions table created');
        db.end();
      });
    });
  });
});