const Publication = require('../models/Publication');

exports.create = (data) => Publication.create(data);
exports.getAll = () => Publication.find();
exports.getAllLeaned = () => Publication.find().lean();
exports.getOneDetailed = (userId) => Publication.findById(userId).populate('author').lean();
exports.getOne = (userId) => Publication.findById(userId);
exports.delete = (_id) => Publication.deleteOne({_id});
exports.update = (_id, data) => Publication.findByIdAndUpdate(_id, data);