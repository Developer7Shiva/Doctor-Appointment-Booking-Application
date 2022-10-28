const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  licenseNo: {
    type: Number,
    required: true,
    unique: true,
  },
  licenseExp: {
    type: String,
    required: true,
  }
},{timestamps:true});
module.exports = mongoose.model("doctor", doctorSchema);
