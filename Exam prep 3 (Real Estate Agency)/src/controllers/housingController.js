const router = require('express').Router();

router.get('/all', (req, res) => {
    res.render('housing/all');
})

module.exports = router;