const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    eggsProduced: {
        type: Number,
        required: true,
        default: 0
    },
    damagedEggs: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;
