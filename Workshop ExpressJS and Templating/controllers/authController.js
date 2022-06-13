const authService = require('../services/authService.js');
const constants = require('../src/constants.js');

const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth/loginPage');
})

router.post('/login', async (req, res) => {
    const userData = req.body;
    try {
        const token = await authService.login(userData);
        if(token){
            res.cookie(constants.sessionName, token, {httpOnly: true});

            res.redirect('/');
        }
        else{
            res.redirect('/404');
        }
    } catch (error) {
        res.redirect('/404');
    }
})

router.get('/register', (req, res) => {
    res.render('auth/registerPage');
})

router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        const createdUser = await authService.register(userData);

        res.redirect('/auth/login');
    } catch (error) {
        res.redirect('/404');
    }

})
router.get('/logout', (req, res) => {
    res.clearCookie(constants.sessionName);

    res.redirect('/');
})

module.exports = router;
