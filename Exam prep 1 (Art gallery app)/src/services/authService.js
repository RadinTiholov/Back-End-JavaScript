const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET, SAULT_ROUNDS} = require('../config/env.js');
const { resolve } = require('path');
const { rejects } = require('assert');

exports.create = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({username}).lean();

    if(!user){
        throw new Error('Username/Password is wrong.')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Username/Password is wrong.')
    }
    const payload = {_id: user._id, username: user.username, adress: user.addres};
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