const express = require('express');
const furnitureController = require('./controllers/furnitureController.js');

const router = express.Router();
router.use('/data/catalog', furnitureController)
module.exports = router;