const router = require('express').Router();
const publicationService = require('../services/publicationService');

router.get('/',  async (req, res) => {
    const publications = await publicationService.getAllLeaned();
    res.render('home/index', {publications});
})

module.exports = router;