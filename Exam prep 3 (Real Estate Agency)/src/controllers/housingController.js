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

module.exports = router;