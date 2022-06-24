const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SAULT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function() {
                var re = /[\w]+ [\w]+/;
                return re.test(this.name);
            },
            message: 'Provided name is invalid.'
        }
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'The user already exists.'],
        minLength: 5
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