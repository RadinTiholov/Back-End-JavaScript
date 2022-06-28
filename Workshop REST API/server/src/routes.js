const express = require('express');
const furnitureController = require('./controllers/furnitureController.js');
const usersController = require('./controllers/usersController.js');

const router = express.Router();
router.use('/data/catalog', furnitureController)
router.use('/users', usersController)
module.exports = router;