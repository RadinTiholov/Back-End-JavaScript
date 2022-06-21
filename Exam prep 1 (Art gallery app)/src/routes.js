const express = require('express');

const router = express.Router();
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const publicationController = require('./controllers/publicationController.js');

router.use(homeController);
router.use('/auth', authController);
router.use('/publication', publicationController);
router.get('*', (req, res) => {
    res.status(404).render('404');
});
module.exports = router;