const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, // Date of sale
  quantity: { type: Number, required: true }, // Quantity of trays sold
  pricePerTray: { type: Number, required: true }, // Price per tray
  villageTo: { type: String }, // Destination village for the sale
  expenses: {  // Nested object for various expenses
    fuelCharge: { type: Number, default: 0 }, // Fuel charges
    food: { type: Number, default: 0 } // Food expenses
  },
  saleType: { type: String, enum: ['retail', 'wholesale'], required: true }, // Sale type (retail or wholesale)
  totalSales: { type: Number, default: 0 }, // Total sales amount before expenses
  income: { type: Number, default: 0 }, // Income before expenses
  incomeAfterExpenses: { type: Number, default: 0 }, // Net income after deducting expenses
});

// Middleware to calculate totalSales and income after expenses before saving the document
salesSchema.pre('save', function (next) {
  // Calculate total sales (quantity * pricePerTray)
  this.totalSales = this.quantity * this.pricePerTray;

  // Calculate net income after expenses
  const totalExpenses = (this.expenses.fuelCharge || 0) + (this.expenses.food || 0);
  this.incomeAfterExpenses = this.totalSales - totalExpenses;

  next();
});

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
