const router = require('express').Router();

const { isAuth, isGuest } = require('../middlewares/authMiddleware.js');

const tripService = require('../services/tripService.js');

router.get('/offer', isAuth, (req, res) => {
    res.render('trip/create');
});

router.post('/offer', isAuth, async (req, res) => {
    console.log(req.body);
    try{
        const createdtrip = await tripService.create(req.body);
        res.redirect('/shared');
    }catch(error){
        res.render('trip/create', {error: error.message});
    }
})

module.exports = router;