const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    isAtHome: {
        type: Boolean
    },
    deliverer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Deliverer'
    },
    packages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Package'
        }
    ],
    note: {
        type: String
    },
    hasPassed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Delivery', deliverySchema);
