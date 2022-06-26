const Furniture = require('../models/Furniture.js');

exports.getAll = () => Furniture.find();
exports.create = (data) => Furniture.create(data);
exports.getOne = (id) => Furniture.findById(id);
exports.update = (id, data) => Furniture.findByIdAndUpdate(id, data);
exports.delete = (_id) => Furniture.deleteOne({_id});