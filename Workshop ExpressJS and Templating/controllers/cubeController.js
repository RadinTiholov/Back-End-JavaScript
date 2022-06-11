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

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getOneCube(id);
    cube["difficultyLevel" + cube.difficultyLevel] = true;
    res.render('editCubePage', {cube});
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const cube = req.body;
    try {
        const updatedCube = await cubeServices.updateCube(id, cube);
        res.redirect(`/cube/details/${id}`);
    } catch (error) {
        res.redirect(`/404`);
    }
});

module.exports = router;