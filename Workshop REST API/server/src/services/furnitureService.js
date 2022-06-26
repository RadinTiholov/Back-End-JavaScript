const Furniture = require('../models/Furniture.js');

exports.getAll = () => Furniture.find();