const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/expense_types', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model for expense types
const expenseTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
});

const ExpenseType = mongoose.model('ExpenseType', expenseTypeSchema);

// Routes
app.get('/expense-types', async (req, res) => {
    try {
        const expenseTypes = await ExpenseType.find();
        res.json(expenseTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/expense-types', async (req, res) => {
    try {
        const newExpenseType = new ExpenseType(req.body);
        await newExpenseType.save();
        res.status(201).json(newExpenseType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/expense-types/:id', async (req, res) => {
    try {
        const updatedExpenseType = await ExpenseType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExpenseType) return res.status(404).json({ error: 'Expense Type not found' });
        res.json(updatedExpenseType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/expense-types/:id', async (req, res) => {
    try {
        const deletedExpenseType = await ExpenseType.findByIdAndDelete(req.params.id);
        if (!deletedExpenseType) return res.status(404).json({ error: 'Expense Type not found' });
        res.json({ message: 'Expense Type deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Expense Type Service listening on port ${port}`);
});
