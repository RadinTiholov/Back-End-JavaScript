const router = require('express').Router();

const { USER_COOKIE_NAME } = require('../config/env.js');
const { isAuth, isGuest } = require('../middlewares/authMiddleware.js');
const authService = require('../services/authService.js');

router.get('/login',isGuest, (req, res) => {
    res.render('auth/login');
})
router.post('/login', isGuest, async (req, res) => {
    const {username, password} = req.body;
    try {  
        const token = await authService.login(username, password);

        res.cookie(USER_COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        return res.render('auth/login', {error: error.message});
    }
})

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
})
router.post('/register', isGuest,async (req, res) => {
    const {username, password, repeatPassword} = req.body;
    if(password != repeatPassword){
        return res.render('auth/register', {error: 'Pasword mismatch'})
    }
    try {
        await authService.create(req.body);
    } catch (error) {
        return res.render('auth/register', {error: error.message})
    }

    res.redirect('/auth/login')
})

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(USER_COOKIE_NAME);
    res.redirect('/');
})

module.exports = router;