const mongoose = require('mongoose');

const packageSchema = new mongoose.Model({
    deliveries: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Delivery'
        }
    ]
});

module.exports = mongoose.model('Package', packageSchema);
