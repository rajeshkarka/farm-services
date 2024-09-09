const express = require('express');
const Sale = require('../models/Sale');

/**
 * Create a new sale.
 * @param {Object} saleData - Data for the new sale.
 * @returns {Promise<Sale>} - The created sale document.
 */
exports.createSale = async (saleData) => {
    const sale = new Sale(saleData);
    return await sale.save();
};

/**
 * Get all sales.
 * @returns {Promise<Array<Sale>>} - List of all sales.
 */
exports.getAllSales = async () => {
    return await Sale.find();
};

/**
 * Get a sale by ID.
 * @param {string} saleId - The ID of the sale to retrieve.
 * @returns {Promise<Sale>} - The sale document.
 */
exports.getSaleById = async (saleId) => {
    return await Sale.findById(saleId);
};

/**
 * Update a sale by ID.
 * @param {string} saleId - The ID of the sale to update.
 * @param {Object} updateData - Data to update the sale.
 * @returns {Promise<Sale>} - The updated sale document.
 */
exports.updateSaleById = async (saleId, updateData) => {
    return await Sale.findByIdAndUpdate(saleId, updateData, { new: true });
};

/**
 * Delete a sale by ID.
 * @param {string} saleId - The ID of the sale to delete.
 * @returns {Promise<Sale>} - The deleted sale document.
 */
exports.deleteSaleById = async (saleId) => {
    return await Sale.findByIdAndDelete(saleId);
};
