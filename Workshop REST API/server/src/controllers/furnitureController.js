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

module.exports = router;