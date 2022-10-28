// const express = require('express');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male","female","transgender"]
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    }
}, {timestamps:true});
module.exports = mongoose.model('admin', adminSchema);