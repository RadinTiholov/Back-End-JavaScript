const router = require('express').Router();

const { isAuth, isGuest, isAuthor } = require('../middlewares/authMiddleware.js');

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
    const tripRaw = await tripService.getOne(req.params.id);

    const author = await tripService.getAuthor(trip.author).lean();
    const isAuthor = req.user?._id == trip.author._id;
    const isJoined = tripRaw.buddies.includes(req.user?._id);
    const isfreeSeats = trip.seats - trip.buddies.length > 0;
    const freeSeats = trip.seats - trip.buddies.length;

    res.render('trip/details', {...trip, authorObj:author, isAuthor, isJoined, isfreeSeats, freeSeats});
})
router.get('/join/:id', isAuth, async (req, res) => {
    const trip = await tripService.getOneDetailed(req.params.id).lean();
    const tripRaw = await tripService.getOne(req.params.id);
    const isAuthor = req.user._id == trip.author._id;
    const isfreeSeats = trip.seats - trip.buddies.length > 0;
    const isJoined = tripRaw.buddies.includes(req.user?._id);
    if(!isAuthor && isfreeSeats && !isJoined){
        tripRaw.buddies.push(req.user._id );
        tripRaw.save();

        const author = await tripService.getAuthor(trip.author);
        author.tripsHistory.push(trip._id);
        author.save();

        res.redirect(`/trip/details/${req.params.id}`);
    }
    else{
        res.status(401).render('404', {error: "Not authorized to do this action."})
    }
});
router.get('/delete/:id', isAuth, async (req, res) => {
    const trip = await tripService.getOneDetailed(req.params.id).lean();
    const isAuthor = req.user._id == trip.author._id;
    if(isAuthor){
        await tripService.delete(req.params.id);

        res.redirect('/trip/shared');
    }
    else{
        res.status(401).render('404', {error: "Not authorized to do this action."})
    }
});
router.get('/edit/:id', isAuth, isAuthor,  async (req, res) => {
    const trip = await tripService.getOneDetailed(req.params.id).lean();
    res.render(`trip/edit`, {...trip});
})

router.post('/edit/:id', isAuth, isAuthor, async (req, res) => {
    const trip = await tripService.getOneDetailed(req.params.id).lean();

    await tripService.update(req.params.id, req.body);
    res.redirect(`/trip/details/${req.params.id}`);
});


module.exports = router;