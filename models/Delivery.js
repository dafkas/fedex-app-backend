const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  isAtHome: {
    type: Boolean
  },
  consumer: {
    type: mongoose.Schema.ObjectId,
    ref: "Consumer",
    required: "Consumer is required"
  },
  deliverer: {
    type: mongoose.Schema.ObjectId,
    ref: "Deliverer",
    required: "Deliverer is required"
  },
  packages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Package"
    }
  ],
  note: {
    type: String
  }
});

module.exports = mongoose.model("Delivery", deliverySchema);
