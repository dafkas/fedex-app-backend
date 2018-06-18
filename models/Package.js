const mongoose = require('mongoose');



const packageSchema = new mongoose.Schema({
    address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    meta: {
        weight: {
            type: Number
        },
        size: {
            type: Number
        },
        floor_num: {
            type: Number
        },
        elevator_present: {
            type: Boolean
        },
        weather_conditions: {
            type: Number
        }
    },
    consumer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Consumer',
        required: 'Consumer is required'
    },
    timestamp_start_day: {
        type: Number
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
