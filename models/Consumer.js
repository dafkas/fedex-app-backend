const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const consumerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: 'Email is required'
    },
    phone: {
        type: Number,
        required: 'Phone is required'
    },
    username: {
        type: String,
        required: 'Username is required',
        unique: true
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    }
});

module.exports = mongoose.model('Consumer', consumerSchema);
