const Publication = require('../models/Publication');

exports.create = (data) => Publication.create(data);
exports.getAll = () => Publication.find();
exports.getAllLeaned = () => Publication.find().lean();
exports.getOneDetailed = (userId) => Publication.findById(userId).populate('author').lean();