const express = require('express');

const router = express.Router();
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');

router.use(homeController);
router.use('/auth', authController);
module.exports = router;