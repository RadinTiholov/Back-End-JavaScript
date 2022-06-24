const express = require('express');

const router = express.Router();
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const housingController = require('./controllers/housingController.js');

router.use(homeController);
router.use('/auth', authController);
router.use('/housing', housingController)
router.get('*', (req, res) => {
    res.status(404).render('404');
});
module.exports = router;