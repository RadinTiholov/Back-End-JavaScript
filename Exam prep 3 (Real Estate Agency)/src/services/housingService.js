const Housing = require('../models/Housing');

exports.create = (data) => Housing.create(data);
exports.getAll = () => Housing.find();