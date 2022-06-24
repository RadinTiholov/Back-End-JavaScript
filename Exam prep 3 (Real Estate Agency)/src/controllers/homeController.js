const router = require('express').Router();
const housingService = require('../services/housingService.js');

router.get('/', async (req, res) => {
    const housingsGot = await housingService.getAll().lean();
    const housings = housingsGot.slice(0, 3);
    res.render('home/index', {housings});
})

module.exports = router;