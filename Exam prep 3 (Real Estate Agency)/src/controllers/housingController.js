const { isAuth } = require('../middlewares/authMiddleware');
const housingService = require('../services/housingService.js');

const router = require('express').Router();

router.get('/all', async (req, res) => {
    const housings = await housingService.getAll().lean();
    res.render('housing/all', {housings});
})

router.get('/search', isAuth, (req, res) => {
    res.render('housing/search' , {firstEnter: true});
})

router.post('/search', isAuth, async (req, res) => {
    const search = req.body.search;
    const housings = await (await housingService.getAll().lean()).filter(x => x.type == search);
    res.render('housing/search' , {housings, firstEnter: false});
})

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create')
})
router.post('/create', isAuth, async (req, res) => {
    try{
        const owner = req.user._id;
        await housingService.create({...req.body, owner});
        res.redirect('/housing/all');
    } catch(error){
        res.render('housing/create', {error: error.message})
    }
})

router.get('/details/:id', async (req,res) => {
    const housing = await housingService.getOneDetailed(req.params.id).lean();
    const housingRaw = await housingService.getOne(req.params.id);
    let rentedAHouseJoined = null;
    const isAuthor = req.user?._id == housing.owner._id;
    const isJoined = housingRaw.renredAHome.includes(req.user?._id);
    const isAvailable = housing.availablePieces - housing.renredAHome.length > 0;
    const availablePlaces = housing.availablePieces - housing.renredAHome.length;

    rentedAHouseJoined = housing.renredAHome.map(x => x.name).join(', ');
    console.log(rentedAHouseJoined);

    res.render('housing/details', {...housing, rentedAHouseJoined,isAuthor, isJoined, isAvailable, availablePlaces});
})

router.get('/rent/:id', isAuth, async (req, res) => {
    const housing = await housingService.getOneDetailed(req.params.id).lean();
    const housingRaw = await housingService.getOne(req.params.id);
    const isAuthor = req.user?._id == housing.owner._id;
    const isAvailable = housing.availablePieces - housing.renredAHome.length > 0;
    const isJoined = housingRaw.renredAHome.includes(req.user?._id);
    if(!isAuthor && !isJoined && isAvailable){
        housingRaw.renredAHome.push(req.user._id)
        housingRaw.save();

        res.redirect(`/housing/details/${req.params.id}`)
    }
    else{
        res.render('404', {error: "Unauthorized to do this action."})
    }
})

router.get('/delete/:id', isAuth, async (req, res) => {
    const housing  = await housingService.getOneDetailed(req.params.id).lean();
    const isAuthor = req.user._id == housing.owner._id;
    if(isAuthor){
        await housingService.delete(req.params.id);

        res.redirect('/housing/all');
    }
    else{
        res.status(401).render('404', {error: "Unauthorized to do this action."})
    }
})

module.exports = router;