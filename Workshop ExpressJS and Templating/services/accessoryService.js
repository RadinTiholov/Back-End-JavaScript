const { default: mongoose } = require("mongoose")
const Accessory = require('../models/Accessory');

const addAccessory = async (accessory) => {
    const accessoryModel = new Accessory(accessory);
    const savedAccessor = await accessoryModel.save();
    return savedAccessor;
}
const getAllAccessories = async () => {
    const accessories = await Accessory.find().lean();

    return accessories;
}
const getOneAccessory = async (id) => {
    const accessory = await Accessory.findById(id).lean();

    return accessory;
}
const getAllAvailable = async (cubeId) =>{
    return Accessory.find({_id : {$nin: cubeId}}).lean();
}

module.exports = accessoryService = {
    addAccessory,
    getAllAccessories,
    getOneAccessory,
    getAllAvailable
}