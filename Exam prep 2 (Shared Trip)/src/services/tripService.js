const Trip = require('../models/Trip');
const User = require('../models/User');

exports.create = (data) => Trip.create(data);
exports.getAll = () => Trip.find();
exports.getOne = (id) => Trip.findById(id); 
exports.getOneDetailed = (id) => Trip.findById(id).populate('buddies'); 
exports.getAuthor = (id) => User.findById(id);
exports.delete = (_id) => Trip.deleteOne({_id});
exports.update = (id, data) => Trip.findByIdAndUpdate(id, data);