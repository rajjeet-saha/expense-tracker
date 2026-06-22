const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GET all transactions
app.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET balance
app.get('/balance', (req, res) => {
  db.query('SELECT type, SUM(amount) as total FROM transactions GROUP BY type', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    let income = 0, expense = 0;
    results.forEach(row => {
      if (row.type === 'income') income = parseFloat(row.total);
      if (row.type === 'expense') expense = parseFloat(row.total);
    });

    res.json({ income, expense, balance: income - expense });
  });
});

// POST new transaction
app.post('/transactions', (req, res) => {
  const { description, amount, type } = req.body;
  if (!description || !amount || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.query(
    'INSERT INTO transactions (description, amount, type) VALUES (?, ?, ?)',
    [description, amount, type],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, description, amount, type });
    }
  );
});

// DELETE a transaction
app.delete('/transactions/:id', (req, res) => {
  db.query('DELETE FROM transactions WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));