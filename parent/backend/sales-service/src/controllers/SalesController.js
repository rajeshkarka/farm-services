const salesService = require('../services/salesService');

/**
 * Create a new sale.
 */
exports.createSale = async (req, res) => {
    try {
        const sale = await salesService.createSale(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Get all sales.
 */
exports.getAllSales = async (req, res) => {
    try {
        const sales = await salesService.getAllSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Get a sale by ID.
 */
exports.getSaleById = async (req, res) => {
    try {
        const sale = await salesService.getSaleById(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Update a sale by ID.
 */
exports.updateSaleById = async (req, res) => {
    try {
        const sale = await salesService.updateSaleById(req.params.id, req.body);
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Delete a sale by ID.
 */
exports.deleteSaleById = async (req, res) => {
    try {
        const sale = await salesService.deleteSaleById(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
