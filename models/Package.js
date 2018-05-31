const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    consumer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Consumer',
        required: 'Consumer is required'
    },
    deliveries: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Delivery'
        }
    ],
    size: {
        type: Number
    },
    weight: {
        type: Number
    }
});

module.exports = mongoose.model('Package', packageSchema);
