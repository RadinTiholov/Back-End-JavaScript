const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SAULT_ROUNDS } = require('../config/env');
const { nextTick } = require('process');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'The user already exists.'],
        validate: {
            validator: function() {
                var re = /\w+@.+/;
                return re.test(this.email);
            },
            message: 'Provided email is invalid.'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    tripsHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trip'
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