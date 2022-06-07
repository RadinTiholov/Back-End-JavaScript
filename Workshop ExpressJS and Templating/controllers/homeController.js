const cubeServices = require('../services/cubeServices');

exports.index = async (req, res) => {
    const cubes = await cubeServices.getAllCubes();
    res.render('index', {cubes});
}

exports.notFound = (req, res) =>{
    res.render('404');
}