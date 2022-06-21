const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SAULT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        unique: [true, 'The user already exists.']
    },
    password: {
        type: String,
        minLength: 3,
        required: true
    },
    addres: {
        type: String,
        maxLength: 20,
        required: true
    },
    publications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }]
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