// const express = require('express');
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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
  },
  birthDate: {
    type: String,
  },
  phone: {
    type: Number,
    required:true
  },
  address: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  }
},{timestamps: true});
module.exports = mongoose.model("patient", patientSchema);
