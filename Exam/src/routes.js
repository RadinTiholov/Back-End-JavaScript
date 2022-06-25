const express = require('express');

const router = express.Router();
const homeController = require('./controllers/homeController.js');
const cryptoController = require('./controllers/cryptoController.js');
const authController = require('./controllers/authController.js');

router.use(homeController);
router.use('/auth', authController);
router.use('/crypto', cryptoController);
router.get('*', (req, res) => {
    res.status(404).render('404');
});
module.exports = router;