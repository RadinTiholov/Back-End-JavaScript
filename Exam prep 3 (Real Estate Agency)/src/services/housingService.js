const Housing = require('../models/Housing');

exports.create = (data) => Housing.create(data);
exports.getAll = () => Housing.find();
exports.getOneDetailed = (id) => Housing.findById(id).populate('renredAHome');
exports.getOne = (id) => Housing.findById(id);
exports.delete = (_id) => Housing.deleteOne({_id});
exports.update = (id, data) => Housing.findByIdAndUpdate(id, data);