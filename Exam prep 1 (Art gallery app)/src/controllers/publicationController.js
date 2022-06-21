const router = require('express').Router();
const { isAuth, isGuest } = require('../middlewares/authMiddleware.js');
const publicationService = require('../services/publicationService.js');

router.get('/gallery', async (req, res) =>{
    const publications = await publicationService.getAllLeaned();
    res.render('publication/gallery', {publications});
})
router.get('/create', isAuth, (req, res) => {
    res.render('publication/create');
})
router.post('/create', isAuth, async (req, res) => {
    try{
        const createdPublicaiton = await publicationService.create({...req.body, author: req.user._id});
        res.redirect('/publication/gallery');
    }
    catch(error){
        res.render('publication/create', {error: error.message, ...req.body})
    }
})
router.get('/details/:id', async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id);
    const isAuthor = req.user?._id == publication.author._id;
    const isShared = false;

    res.render('publication/details', {...publication, isAuthor, isShared});
})
router.get('/share/:id', isAuth, async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id);
    const isAuthor = req.user?._id == publication.author._id;
    if(!isAuthor){
        console.log("Shared");
    }
    else{
        res.render('404', {error: 'Unauthorized to do this action.'})
    }
})

module.exports = router;