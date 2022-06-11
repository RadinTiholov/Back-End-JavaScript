const { default: mongoose } = require("mongoose");
const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube")

const addCube = async (cube) => {
    const cubeModel = new Cube(cube);
    const savedCube = await cubeModel.save();
    return savedCube;
}
const getAllCubes = async () => {
    const cubes = await Cube.find().lean();

    return cubes;
}
const getOneCube = async (id) => {
    const cube = await Cube.findById(id).populate('accessories').lean();
    return cube;
}
const attachAccessory = async (accessoryId, cubeId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}
const updateCube = async (cubeId, cube) => {
    return await Cube.findByIdAndUpdate(cubeId, cube);
}
const deleteCube = async (cubeId) => {
    return await Cube.findByIdAndDelete(cubeId);
}

module.exports = cubeServices = {
    addCube,
    getAllCubes,
    getOneCube,
    attachAccessory,
    updateCube
}