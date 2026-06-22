import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({ income: 0, expense: 0, balance: 0 });
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [error, setError] = useState('');

  const fetchData = async () => {
    const [t, b] = await Promise.all([
      axios.get(`${API}/transactions`),
      axios.get(`${API}/balance`)
    ]);
    setTransactions(t.data);
    setBalance(b.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!description || !amount) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    await axios.post(`${API}/transactions`, { description, amount: parseFloat(amount), type });
    setDescription('');
    setAmount('');
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/transactions/${id}`);
    fetchData();
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <div className="balance-box">
        <div className="balance-item income">
          <span>Income</span>
          <strong>₹{balance.income.toFixed(2)}</strong>
        </div>
        <div className="balance-item total">
          <span>Balance</span>
          <strong>₹{balance.balance.toFixed(2)}</strong>
        </div>
        <div className="balance-item expense">
          <span>Expenses</span>
          <strong>₹{balance.expense.toFixed(2)}</strong>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="transactions">
        <h2>Transactions</h2>
        {transactions.length === 0 && <p className="empty">No transactions yet.</p>}
        {transactions.map(t => (
          <div key={t.id} className={`transaction ${t.type}`}>
            <div className="transaction-info">
              <span className="desc">{t.description}</span>
              <span className="date">{new Date(t.created_at).toLocaleDateString()}</span>
            </div>
            <div className="transaction-right">
              <span className="amount">{t.type === 'income' ? '+' : '-'}₹{parseFloat(t.amount).toFixed(2)}</span>
              <button className="delete" onClick={() => handleDelete(t.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;