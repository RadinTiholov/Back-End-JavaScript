const User = require("../models/User")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('../src/constants.js');
const { isValidObjectId } = require("mongoose");


const register = async ({username, password, repeatPassword}) => {
    if(password != repeatPassword){
        throw new Error();
    }

    const hashedPassword = await bcrypt.hash(password, constants.saultRounds);

    let createdUser = User.create({
        username,
        password: hashedPassword
    })

    return createdUser;
}

const login = async ({username, password}) => {
    const user = await User.findOne({username});

    if (!user) {
        throw new Error();
    }
    const isValid = await bcrypt.compare(password, user.password);
    const result = new Promise((resolve, reject) => {
        jwt.sign({_id: user._id, username: user.username}, constants.secret, {expiresIn: '2d'}, (err, token) => {
            if(err){
                return reject(err);
            }

            resolve(token);
        });
    })

    return result;
}

module.exports = {
    register,
    login
}