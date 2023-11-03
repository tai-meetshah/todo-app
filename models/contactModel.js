const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  address: {
    type: String,
    required: [true, "Address is required."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required."],
    trim: true,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
