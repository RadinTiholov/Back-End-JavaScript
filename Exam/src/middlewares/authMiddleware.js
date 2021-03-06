const jwt = require('jsonwebtoken');
const { USER_COOKIE_NAME, SECRET } = require('../config/env');

exports.auth = (req, res, next) => {
    const token = req.cookies[USER_COOKIE_NAME];
    if(token){
        jwt.verify(token, SECRET, (err, decoredToken) => {
            if(err){
                res.clearCookie(USER_COOKIE_NAME);
                return next(err);
            }

            req.user = decoredToken;
            res.locals.user = decoredToken;

            next();
        });
    }
    else{
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('/auth/login');
    }

    next();
}

exports.isGuest = (req, res, next) => {
    if(req.user){
        return res.redirect('/');
    }

    next();
}