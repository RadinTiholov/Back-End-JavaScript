const { appendFile } = require('fs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const constants = require('../src/constants.js');

const jwtVerify = promisify(jwt.verify)

exports.auth = async (req, res, next) => {
    let token = req.cookies[constants.sessionName];
    
    if(token){
        try {
            const decodedToken = await jwtVerify(token, constants.secret);

            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (error) {
            return res.redirect('/404');
        }
    }

    next();
}