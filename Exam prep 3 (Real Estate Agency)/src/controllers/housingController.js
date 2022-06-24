const { isAuth } = require('../middlewares/authMiddleware');
const housingService = require('../services/housingService.js');

const router = require('express').Router();

router.get('/all', (req, res) => {
    res.render('housing/all');
})

router.get('/create', isAuth, async (req, res) => {
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