const router = require('express').Router();
const furnitureService = require('../services/furnitureService.js');

router.get('/', async (req, res) => {
    const furniture = await furnitureService.getAll();
    res.json(furniture);
})

module.exports = router;