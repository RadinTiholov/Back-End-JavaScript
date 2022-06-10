const User = require("../models/User")

const bcrypt = require('bcrypt');
const constants = require('../src/constants.js');


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

module.exports = {
    register
}