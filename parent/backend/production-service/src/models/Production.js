const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    eggsProduced: {
        type: Number,
        required: true
    },
    damagedEggs: {
        type: Number,
        default: 0
    }
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;
