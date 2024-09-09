const express = require('express');
const router = express.Router();
const salesController = require('../controllers/SalesController');

// Route to create a new sale
router.post('/sales', salesController.createSale);

// Route to get all sales
router.get('/sales', salesController.getAllSales);

// Route to get a sale by ID
router.get('/sales/:id', salesController.getSaleById);

// Route to update a sale by ID
router.put('/sales/:id', salesController.updateSaleById);

// Route to delete a sale by ID
router.delete('/sales/:id', salesController.deleteSaleById);

module.exports = router;
