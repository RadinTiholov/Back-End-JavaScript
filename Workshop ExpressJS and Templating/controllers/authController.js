const authService = require('../services/authService.js');

const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
})

router.post('/login', async (req, res) => {
    const userData = req.body;
    try {
        const token = await authService.login(userData);
        console.log(token);
        if(token){
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
    res.render('registerPage');
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

module.exports = router;
