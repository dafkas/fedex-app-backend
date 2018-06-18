const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
    isAtHome: {
        type: Boolean
    },
    deliverer: {
        type: mongoose.Schema.ObjectId,
        ref: "Deliverer"
    },
    packages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Package"
        }
    ],
    note: {
        type: String
    },
    hasPassedBatch: {
        type: Boolean
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model("Delivery", deliverySchema);
