const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true
  },
  deliveries: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Delivery"
    }
  ]
});

module.exports = mongoose.model("Package", packageSchema);
