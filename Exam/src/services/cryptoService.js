const Crypto = require('../models/Crypto');

exports.create = (data) => Crypto.create(data);
exports.getAll = () => Crypto.find();
exports.getOne = (id) => Crypto.findById(id);
exports.getOneDetailed = (id) => Crypto.findById(id).populate("buyACrypto");
exports.delete = (_id) => Crypto.deleteOne({_id});
exports.update = (id, data) => Crypto.findByIdAndUpdate(id, data);