const Production = require('../models/Production');

/**
 * Record production data.
 * @param {Object} productionData - Production data to record.
 * @returns {Promise<Object>} - Saved production data.
 */
exports.recordProduction = async (productionData) => {
    const production = new Production(productionData);
    return await production.save();
};

/**
 * Get weekly production data.
 * @param {String} week - Week number in 'YYYY-WW' format (e.g., '2024-34').
 * @returns {Promise<Array>} - Aggregated weekly production data.
 */
exports.getWeeklyProduction = async (week) => {
    try {
        // Split the week string to get year and week number
        const [year, weekNumber] = week.split('-').map(Number);

        // Calculate the start and end dates of the given week
        const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);

        // Fetch and aggregate production data for the specified week
        const weeklyProduction = await Production.aggregate([
            {
                $match: {
                    date: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalEggsProduced: { $sum: '$eggsProduced' },
                    totalDamagedEggs: { $sum: '$damagedEggs' }
                }
            }
        ]);

        return weeklyProduction.length ? weeklyProduction[0] : { totalEggsProduced: 0, totalDamagedEggs: 0 };
    } catch (error) {
        throw new Error(`Error fetching weekly production: ${error.message}`);
    }
};

/**
 * Get monthly production data.
 * @param {String} month - Month in 'YYYY-MM' format (e.g., '2024-08').
 * @returns {Promise<Array>} - Aggregated monthly production data.
 */
exports.getMonthlyProduction = async (month) => {
    try {
        // Split the month string to get year and month number
        const [year, monthNumber] = month.split('-').map(Number);

        // Calculate the start and end dates of the given month
        const startDate = new Date(year, monthNumber - 1, 1);
        const endDate = new Date(year, monthNumber, 1);

        // Fetch and aggregate production data for the specified month
        const monthlyProduction = await Production.aggregate([
            {
                $match: {
                    date: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalEggsProduced: { $sum: '$eggsProduced' },
                    totalDamagedEggs: { $sum: '$damagedEggs' }
                }
            }
        ]);

        return monthlyProduction.length ? monthlyProduction[0] : { totalEggsProduced: 0, totalDamagedEggs: 0 };
    } catch (error) {
        throw new Error(`Error fetching monthly production: ${error.message}`);
    }
};
