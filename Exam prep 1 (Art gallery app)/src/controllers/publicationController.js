const router = require('express').Router();
const { isAuth, isGuest } = require('../middlewares/authMiddleware.js');
const publicationService = require('../services/publicationService.js');


router.get('/create', isAuth, (req, res) => {
    res.render('publication/create');
})
router.post('/create', isAuth, async (req, res) => {
    try{
        const createdPublicaiton = await publicationService.create({...req.body, author: req.user._id});
        res.redirect('/gallery');
    }
    catch(error){
        res.render('publication/create', {error: error.message, ...req.body})
    }
})

module.exports = router;