const router = require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res) => {
    const cube = req.body;
    const savedCube = cubeServices.addCube(cube);
    res.redirect('/');
})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getOneCube(id)

    res.render('details', {cube});
})

module.exports = router;