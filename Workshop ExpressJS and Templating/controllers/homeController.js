const cubes = require('../src/db.json');

exports.index = (req, res) => {
    res.render('index', {cubes});
}

exports.notFound = (req, res) =>{
    res.render('404');
}