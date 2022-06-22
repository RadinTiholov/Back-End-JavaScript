const router = require('express').Router();

const { USER_COOKIE_NAME } = require('../config/env.js');
const { isAuth, isGuest } = require('../middlewares/authMiddleware.js');
const authService = require('../services/authService.js');

router.get('/login',isGuest, (req, res) => {
    res.render('auth/login');
})
router.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;
    try {  
        const token = await authService.login(email, password);

        res.cookie(USER_COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        return res.render('auth/login', {error: error.message});
    }
})

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
})
router.post('/register', isGuest, async (req, res) => {
    const {email, password, rePassword} = req.body;
    if(password != rePassword){
        return res.render('auth/register', {error: 'Pasword mismatch'})
    }
    try {
        await authService.create(req.body);
        const token = await authService.login(email, password);

        res.cookie(USER_COOKIE_NAME, token, {httpOnly: true});
    } catch (error) {
        return res.render('auth/register', {error: error.message})
    }

    res.redirect('/')
})

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(USER_COOKIE_NAME);
    res.redirect('/');
})

module.exports = router;