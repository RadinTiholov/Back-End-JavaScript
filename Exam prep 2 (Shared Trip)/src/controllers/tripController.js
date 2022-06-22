const router = require('express').Router();

const { isAuth, isGuest } = require('../middlewares/authMiddleware.js');

const tripService = require('../services/tripService.js');

router.get('/offer', isAuth, (req, res) => {
    res.render('trip/create');
});

router.post('/offer', isAuth, async (req, res) => {
    console.log(req.body);
    try{
        const author = req.user._id;
        const createdtrip = await tripService.create({...req.body, author});
        res.redirect('/trip/shared');
    }catch(error){
        res.render('trip/create', {error: error.message});
    }
})

router.get('/shared', async (req, res) => {
    const trips = await tripService.getAll().lean();
    res.render('trip/shared', {trips});
})

router.get('/details/:id', async (req, res) => {
    const trip = await tripService.getOneDetailed(req.params.id).lean();
    const author = await tripService.getAuthor(trip.author).lean();
    const tripRaw = await tripService.getOne(req.params.id);
    
    res.render('trip/details', {...trip, authorObj:author});
})

module.exports = router;