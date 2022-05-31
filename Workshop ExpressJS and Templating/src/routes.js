const { Router } = require('express');
const express = require('express');

const homeContoller = require('../controllers/homeController.js');
const aboutPageCotroller = require('../controllers/aboutPageCotroller.js');
const cubeController = require('../controllers/cubeController.js');

const router = express.Router();

router.get('/', homeContoller.index);
router.get('/about', aboutPageCotroller.index);
router.use('/cube', cubeController);
router.get('*', homeContoller.notFound)

module.exports = router;