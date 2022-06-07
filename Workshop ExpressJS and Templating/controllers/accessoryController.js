const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('createAccessory');
})

router.post('/create', (req, res) => {

    res.redirect('/');
})

router.get('/attach/:id', (req, res ) => {
    res.render('attachAccessory');
})

module.exports = router;