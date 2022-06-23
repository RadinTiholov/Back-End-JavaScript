const jwt = require('jsonwebtoken');
const { USER_COOKIE_NAME, SECRET } = require('../config/env');
const tripService = require('../services/tripService.js');

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
exports.isAuthor = async (req, res, next) => {
    const trip = await tripService.getOneDetailed(req.params.id).lean();
    const isAuthor = req.user?._id == trip.author._id;
    if(!isAuthor){
        res.status(401).render('404', {error: "Not authorized to do this action."})
    }

    next();
}