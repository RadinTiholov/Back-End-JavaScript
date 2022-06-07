const router = require('express').Router();
const accessoryService = require('../services/accessoryService');
const cubeServices = require('../services/cubeServices');

router.get('/create', (req, res) => {
    res.render('createAccessory');
})

router.post('/create', async (req, res) => {
    const accessory = req.body;
    const savedAccessory = accessoryService.addAccessory(accessory);
    res.redirect('/');
})

router.get('/attach/:id', async (req, res ) => {
    const cubeId = req.params.id;
    const cube = await cubeServices.getOneCube(cubeId);
    const accessories = await accessoryService.getAllAvailable(cube.accessories);

    res.render('attachAccessory', {cube, accessories});
})

router.post('/attach/:id', async (req, res) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.id;
    await cubeServices.attachAccessory(accessoryId, cubeId);
    
    res.redirect(`/cube/details/${cubeId}`);
})

module.exports = router;