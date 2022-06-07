const router = require('express').Router();
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('createAccessory');
})

router.post('/create', async (req, res) => {
    const accessory = req.body;
    const savedAccessory = accessoryService.addAccessory(accessory);
    res.redirect('/');
})

router.get('/attach/:id', (req, res ) => {
    res.render('attachAccessory');
})

module.exports = router;