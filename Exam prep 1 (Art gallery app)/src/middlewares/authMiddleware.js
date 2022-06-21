const jwt = require('jsonwebtoken');
const { USER_COOKIE_NAME, SECRET } = require('../config/env');
const publicationService = require('../services/publicationService');

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
        return res.redirect('/gallery');
    }

    next();
}
exports.isAuthor = async (req, res, next) => {
    const publication = await publicationService.getOneDetailed(req.params.id);
    const isAuthor = req.user?._id == publication.author._id;
    if(!isAuthor){
        return res.render('404', {error: 'Unauthorized to do this action.'});
    }

    next();
}