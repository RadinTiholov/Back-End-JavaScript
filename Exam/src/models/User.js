const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SAULT_ROUNDS } = require('../config/env');
const { nextTick } = require('process');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    }
});

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, SAULT_ROUNDS)
        .then(hashedPasword => {
            this.password = hashedPasword;
            next();
        });
})

const User = mongoose.model("User", userSchema);

module.exports = User;