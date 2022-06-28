const router = require('express').Router();
const usersService = require('../services/usersService.js');

router.post('/register', async (req, res) => {
    try{
        const data = await usersService.register(req.body.email, req.body.password);
        res.json(data);
    }catch(error){
        res.status(404).json({message: error.message});
    }
})

router.post('/login', async (req, res) => {
    try{
        const data = await usersService.login(req.body.email, req.body.password);
        res.json(data);
    }catch(error){
        res.status(404).json({message: "Request error"});
    }
})

router.get('/logout', (req, res) => {
    api.logout(req.user.token);
    res.status(204).end();
});

module.exports = router;