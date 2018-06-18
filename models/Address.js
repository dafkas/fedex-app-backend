const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    zip: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    street: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model('Address', addressSchema);
