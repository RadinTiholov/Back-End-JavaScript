const router = require('express').Router();
const cubeServices = require('../services/cubeServices');
const authService = require('../services/authService');

router.get('/create', (req, res) => {
    res.render('cube/create');
})

router.post('/create', (req, res) => {
    const cube = req.body;
    cube['ownerId'] = req.user._id;
    try {
        const savedCube = cubeServices.addCube(cube);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('cube/create', {error: error.message});
    }
})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getOneCube(id)
    const userToken = req.user;
    
    const isAuthorized = authService.isAuthorized(cube.ownerId, userToken);
    res.render('cube/details', {cube, isAuthorized});
})

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getOneCube(id);
    cube["difficultyLevel" + cube.difficultyLevel] = true;
    res.render('cube/edit', {cube});
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const cube = req.body;
    try {
        const updatedCube = await cubeServices.updateCube(id, cube);
        res.redirect(`/cube/details/${id}`);
    } catch (error) {
        res.status(400).render('cube/edit', {error: error.message});
    }
});

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getOneCube(id);
    cube["difficultyLevel" + cube.difficultyLevel] = true;
    res.render('cube/delete', {cube});
})

router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const deletedCube = await cubeServices.deleteCube(id);
        res.redirect(`/`);
    } catch (error) {
        res.redirect('/404');
    }
})

module.exports = router;