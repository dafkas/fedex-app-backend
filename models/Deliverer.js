const mongoose = require("mongoose");

const delivererSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required"
  },
  name: {
    type: String,
    required: "Name is required"
  },
  password: {
    type: String,
    required: "Password is required"
  }
});

module.exports = mongoose.model("Deliverer", delivererSchema);
