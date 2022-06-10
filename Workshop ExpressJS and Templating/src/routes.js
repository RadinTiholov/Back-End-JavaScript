const { Router } = require('express');
const express = require('express');

const homeContoller = require('../controllers/homeController.js');
const aboutPageCotroller = require('../controllers/aboutPageCotroller.js');
const cubeController = require('../controllers/cubeController.js');
const accessoryController = require('../controllers/accessoryController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.get('/', homeContoller.index);
router.get('/about', aboutPageCotroller.index);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/auth', authController)
router.get('*', homeContoller.notFound)

module.exports = router;