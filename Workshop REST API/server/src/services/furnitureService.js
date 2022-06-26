const Furniture = require('../models/Furniture.js');

exports.getAll = () => Furniture.find();
exports.create = (data) => Furniture.create(data);