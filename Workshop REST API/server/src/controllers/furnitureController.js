const router = require('express').Router();
const furnitureService = require('../services/furnitureService.js');

router.get('/', async (req, res) => {
    const furniture = await furnitureService.getAll();
    res.json(furniture);
})
router.post('/', async (req, res) => {
    try{
        const result = await furnitureService.create(req.body);
        res.json(result);
    }catch(error){
        res.status(404).json({message: "Request error"});
    }
})
router.get('/:id', async (req, res) => {
    try{
        const furniture = await furnitureService.getOne(req.params.id).lean();
        res.json(furniture);
    }catch(error){
        res.status(404).json({message: "Request error"});
    }
})
router.put('/:id', async (req, res) => {
    try{
        const data = req.body;
        const furniture = await furnitureService.update(req.params.id, data);
        res.json(furniture);
    }catch(error){
        console.log(error);
        res.status(404).json({message: "Request error"});
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const furniture = await furnitureService.delete(req.params.id);
        res.json(furniture);
    }catch(error){
        res.status(404).json({message: "Request error"});
    }
})

module.exports = router;