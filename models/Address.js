const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    zipcode: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Address', addressSchema);
