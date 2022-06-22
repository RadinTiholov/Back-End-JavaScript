const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET, SAULT_ROUNDS} = require('../config/env.js');

exports.create = (userData) => User.create(userData);

exports.login = async (email, password) => {
    const user = await User.findOne({email}).lean();

    if(!user){
        throw new Error('Email/Password is wrong.')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Email/Password is wrong.')
    }
    const payload = {_id: user._id, email: user.email, gender: user.gender};
    const options = {expiresIn: '2d'};
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if(err){
                reject();
            }
    
            resolve(decodedToken);
        });
    });
    
    return promise;
}
