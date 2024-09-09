const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenses', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema and model
const expenseSchema = new mongoose.Schema({
  amount: Number,
  description: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

// Middleware
app.use(express.json());

// Routes
app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post('/expenses', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.status(201).json(expense);
});

app.listen(port, () => {
  console.log(`Expenses service running on port ${port}`);
});

