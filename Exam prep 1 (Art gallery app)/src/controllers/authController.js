const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
})
router.post('/login', (req, res) => {
    const data = req.body;
    console.log(data);
})

router.get('/register', (req, res) => {
    res.render('auth/register');
})
router.post('/register', (req, res) => {
    const data = req.body;
    console.log(data);
})

module.exports = router;