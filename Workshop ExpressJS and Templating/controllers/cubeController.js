const router = require('express').Router();
const cubes = require('../src/db.json');
const fs = require('fs');
const path = require('path');

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res) => {
    const cube = req.body;
    cube['id'] = cubes.length;
    //TODO Validation
    cubes.push(cube);
    var jsonCubes = JSON.stringify(cubes);

    fs.writeFile(path.resolve('src', 'db.json'), jsonCubes, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
    res.redirect('/');
})

router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const cube = cubes[id];

    res.render('details', {cube});
})

module.exports = router;