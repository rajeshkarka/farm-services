// models/EggStock.js
const mongoose = require('mongoose');

const eggStockSchema = new mongoose.Schema({
    totalStock: {
        type: Number,
        required: true,
        default: 0 // Default value for the initial stock
    },
    stockOut: {
        type: Number,
        required: true,
        default: 0 // Default value for the initial stock
    },
    stockReturned: {
        type: Number,
        required: true,
        default: 0 // Default value for the initial stock
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Ensure there's only one document in the collection
eggStockSchema.statics.getStock = async function() {
    let stock = await this.findOne();
    if (!stock) {
        stock = await this.create({ totalStock: 0 }); // Initialize stock if none exists
    }
    return stock;
};

module.exports = mongoose.model('EggStock', eggStockSchema);
