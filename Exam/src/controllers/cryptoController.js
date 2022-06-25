const { isAuth} = require('../middlewares/authMiddleware');

const router = require('express').Router();
const cryptoService = require('../services/cryptoService.js')

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
})

router.post('/create', isAuth, async (req, res) => {
    try {
        console.log(req.body);
        const owner = req.user._id;
        await cryptoService.create({...req.body, owner})
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('crypto/create', {error: error.message})
    }
})

router.get('/catalog', async (req, res) => {
    const cryptos = await cryptoService.getAll().lean();
    res.render('crypto/catalog', {cryptos})
})

router.get('/details/:id', async (req, res) => {
    try{
        const crypto = await cryptoService.getOneDetailed(req.params.id).lean();
        const cryptoRaw = await cryptoService.getOne(req.params.id);
        const isAuthor = req.user?._id == crypto.owner._id;
        const alreadyBought = cryptoRaw.buyACrypto.includes(req.user?._id);
    
        res.render('crypto/details', {...crypto, isAuthor, alreadyBought});
    }catch(error){
        res.render('404', {error: "Crypto not found"});
    }
    
})

router.get('/buy/:id', isAuth, async (req, res) => {
    try{
        const crypto = await cryptoService.getOneDetailed(req.params.id).lean();
        const cryptoRaw = await cryptoService.getOne(req.params.id);
        const isAuthor = req.user?._id == crypto.owner._id;
        const alreadyBought = cryptoRaw.buyACrypto.includes(req.user?._id);
        if(!isAuthor && !alreadyBought){
            cryptoRaw.buyACrypto.push(req.user._id)
            cryptoRaw.save();
    
            res.redirect(`/crypto/details/${req.params.id}`)
        }else{
            res.render('404', {error: "Unauthorized to do this action"})
        }
    }catch(error){
        res.render('404', {error: "Crypto not found"});
    }
    
})
router.get('/delete/:id', isAuth, async (req, res) => {
    try{
        const crypto = await cryptoService.getOneDetailed(req.params.id).lean();
        const isAuthor = req.user?._id == crypto.owner._id;
        if(isAuthor){
            await cryptoService.delete(req.params.id);
            res.redirect('/crypto/catalog');
        }else{
            res.render('404', "Unauthorized to do this action")
        }
    }catch(error){
        res.render('404', {error: "Something went wrong" })
    }
});
router.get('/edit/:id', isAuth, async (req, res) => {
    try{
        const crypto = await cryptoService.getOneDetailed(req.params.id).lean();
        const isAuthor = req.user?._id == crypto.owner._id;
        if(isAuthor){
            crypto["paymentMethod" + crypto.paymentMethod] = true;
            res.render('crypto/edit', {...crypto});
        }else{
            res.render('404', "Unauthorized to do this action")
        }
    
    }catch(error){
        res.render('404', {error: "Something went wrong" })
    }
})

router.post('/edit/:id', isAuth, async (req, res) => {
    try{
        const crypto = await cryptoService.getOneDetailed(req.params.id).lean();
        const isAuthor = req.user?._id == crypto.owner._id;
        const {name, price, image, description, paymentMethod} = req.body;
        if(isAuthor){
            if(name.length < 2 || !name){
                throw new Error('The Name should be at least two characters')
            }
            else if(price < 0 || !price){
                throw new Error('The Price should be a positive number')
            }
            else if(image.startsWith('http://') == false && image.startsWith('https://') == false){
                throw new Error('The Crypto Image should start with http:// or https://.')
            }
            else if(description.length < 10 || !description){
                throw new Error('The Description should be a minimum of 10 characters long.')
            }
            else if(paymentMethod != 'crypto-wallet' && paymentMethod != 'credit-card' && paymentMethod != 'debit-card' && paymentMethod != 'paypal'){
                throw new Error('Wrong payment method')
            }
            else{
                await cryptoService.update(req.params.id, req.body);  

                res.redirect(`/crypto/details/${req.params.id}`)
            }
        }else{
            res.render('404', "Unauthorized to do this action")
        }
    }catch(error){
        res.render('crypto/edit', {...req.body, _id: req.params.id,error: error.message })
    }
})

router.get('/search', async (req, res) => {
    const cryptos = await cryptoService.getAll().lean();
    res.render('crypto/search', {cryptos, firstEnter: true})
})
router.post('/search', async (req, res) => {
    const {coinName, paymentMethod} = req.body;
    if(coinName != ''){
        const cryptos = await(await cryptoService.getAll().lean()).filter(x => x.name.toLowerCase() == coinName.toLowerCase() && x.paymentMethod.toLowerCase() == paymentMethod.toLowerCase());
        res.render('crypto/search', {cryptos, firstEnter: false})
    }
    else{
        res.render('crypto/search', {error: "Coin name input is required", firstEnter: true})
    }
})

module.exports = router;