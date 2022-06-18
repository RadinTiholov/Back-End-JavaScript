const User = require("../models/User")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('../src/constants.js');
const { isValidObjectId } = require("mongoose");


const register = async ({username, password, repeatPassword}) => {
    if(password != repeatPassword || password == '' || repeatPassword == ''){
        throw new Error("The two passwords are different.");
    }

    const hashedPassword = await bcrypt.hash(password, constants.saultRounds);
    try {
        let createdUser = User.create({
            username,
            password: hashedPassword
        });

        return createdUser;
    } catch (error) {
        
        console.log("Pishaman2");
        throw error;
    }

}

const login = async ({username, password}) => {
    const user = await User.findOne({username});
    console.log(user);
    if (!user) {
        throw new Error('The username or the pasword is wrong');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('The username or the pasword is wrong');
    }
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
const isAuthorized = (userId, userToken) => {
    if(userToken && userId == userToken._id){
        return true;
    }
    return false;
}

module.exports = {
    register,
    login,
    isAuthorized
}