const mongoose = require("mongoose");

const packageSchema = new mongoose.Model({});

module.exports = mongoose.model("Package", packageSchema);
