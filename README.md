# Expense Tracker

A full-stack expense tracking application to manage income and expenses with a live balance dashboard.

## Tech Stack

- **Frontend:** React.js, Axios, CSS3
- **Backend:** Node.js, Express.js, REST API
- **Database:** MySQL

## Features

- Add income and expense transactions
- View live running balance, total income, and total expenses
- Delete transactions
- All data persisted in MySQL database

## Project Structure
expense-tracker/

├── backend/

│   ├── server.js       # Express server & API routes

│   ├── db.js           # MySQL connection

│   ├── setup.js        # Database & table setup

│   └── .env            # Environment variables

└── frontend/

└── src/

├── App.js      # Main React component

└── App.css     # Styling

## Getting Started

### Prerequisites
- Node.js
- MySQL

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=expense_tracker

PORT=5000

Run database setup:
```bash
node setup.js
```

Start the server:
```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /transactions | Get all transactions |
| GET | /balance | Get income, expense, and balance totals |
| POST | /transactions | Add a new transaction |
| DELETE | /transactions/:id | Delete a transaction |
