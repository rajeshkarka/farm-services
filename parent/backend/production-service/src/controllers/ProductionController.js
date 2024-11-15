const Production = require('../models/Production');
const EggStock = require('../models/EggStock');
const productionService = require('../services/productionService');
const moment = require('moment-timezone'); // Import moment-timezone

/**
 * Record daily production and update egg stock.
 */
exports.recordProduction = async (req, res) => {
    try {
        // Extract and validate required fields
        const { date, eggsProduced, damagedEggs } = req.body;

        // Ensure all required fields are present
        if (!date || eggsProduced === undefined) {
            return res.status(400).json({ error: 'Missing required fields: date or eggsProduced' });
        }

        // Convert date to IST
        const dateInIST = moment.tz(date, 'Asia/Kolkata').toDate();

        // Create a new Production record
        const production = new Production({
            date: dateInIST,
            eggsProduced,
            damagedEggs: damagedEggs || 0
        });

        // Save the record to the database
        await production.save();

        // Calculate the total stock of eggs
        const totalEggsProduced = production.eggsProduced;
        const totalDamagedEggs = production.damagedEggs;

        // Retrieve the current egg stock from the database
        let eggStock = await EggStock.findOne(); // Assuming you have only one document for egg stock

        if (!eggStock) {
            // If no egg stock record exists, create one with initial stock (0 or any initial value)
            eggStock = new EggStock({ totalStock: 0 });
        }

        // Update the egg stock
        eggStock.totalStock += (totalEggsProduced - totalDamagedEggs);
        await eggStock.save();

        // Return a success response with updated egg stock
        res.status(201).json({
            production,
            updatedStock: eggStock.totalStock
        });
    } catch (err) {
        // Return an error response
        res.status(400).json({ error: err.message });
    }
};

/**
 * Track all productions.
 */
exports.trackProduction = async (req, res) => {
    try {
        const productions = await Production.find();
        res.status(200).json(productions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Get weekly production data.
 */
exports.getWeeklyProduction = async (req, res) => {
    try {
        const data = await productionService.getWeeklyProduction(req.query.week);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get monthly production data.
 */
exports.getMonthlyProduction = async (req, res) => {
    try {
        const data = await productionService.getMonthlyProduction(req.query.month);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
