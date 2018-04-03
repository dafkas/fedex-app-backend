const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
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
  note: {
    type: Text
  }
});

module.exports = mongoose.model("Delivery", deliverySchema);
