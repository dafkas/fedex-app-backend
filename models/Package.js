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
    ]
});

module.exports = mongoose.model('Package', packageSchema);
