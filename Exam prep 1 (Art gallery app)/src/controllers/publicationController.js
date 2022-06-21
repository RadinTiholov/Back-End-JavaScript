const router = require('express').Router();
const { isAuth, isGuest, isAuthor } = require('../middlewares/authMiddleware.js');
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
    const publicationRaw = await publicationService.getOne(req.params.id);
    const isAuthor = req.user?._id == publication.author._id;
    const isShared = publicationRaw.usersShared.includes(req.user?._id);

    res.render('publication/details', {...publication, isAuthor, isShared});
})
router.get('/share/:id', isAuth, async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id);
    const publicationRaw = await publicationService.getOne(req.params.id);
    const isShared = publicationRaw.usersShared.includes(req.user._id);
    const isAuthor = req.user?._id == publication.author._id;
    if(!isAuthor){
        if(isShared){
            res.render('404', {error: 'Unauthorized to do this action.'})
        }else{ 
            publicationRaw.usersShared.push(req.user._id);
            publicationRaw.save();
    
            res.redirect('/');
        }
    }
    else{
        res.render('404', {error: 'Unauthorized to do this action.'})
    }
    
})
router.get('/delete/:id', isAuth,isAuthor, async (req, res) => {
    await publicationService.delete(req.params.id);

    res.redirect('/publication/gallery');
})
router.get('/edit/:id', isAuth, isAuthor, async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id);

    res.render('publication/edit', {...publication});
})
router.post('/edit/:id', isAuth, isAuthor, async(req, res) => {
    try{
        if(req.body.certificate == '' || req.body.title == ''|| req.body.picture == '' || req.body.technique == ''){
            throw new Error("All fields are required");
        }
        if(req.body.certificate != 'Yes' || req.body.certificate != 'No'){
            throw new Error("The certificete has be only Yes ot No");
        }
        if(req.body.title.length < 6){
            throw new Error("The title length has to be more than 6 characters");
        }
        //TODO Hand validation, because mongoose validation doesn't work....
        await publicationService.update(req.params.id, req.body);

        res.redirect(`/publication/details/${req.params.id}`);
    }catch(error){
        res.render('404', {error: error.message})
    }
    
})

module.exports = router;