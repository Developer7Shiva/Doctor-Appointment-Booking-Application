const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "doctor",
      required: true,
    },
    patientId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "patient",
    },
    dateTime: {
      type: String,
      required:true
    },
    reason: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: " pending"
    },
    suggestions: {
      type: String,
      required: false,
      default: "No Comments",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("appointment", appointSchema);
