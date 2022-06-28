const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SAULT_ROUNDS } = require('../config/env.js');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requred: true,
        unique: true
    },
    password: {
        type: String,
        requred: true
    }
});


const User = mongoose.model("User", userSchema);

module.exports = User;