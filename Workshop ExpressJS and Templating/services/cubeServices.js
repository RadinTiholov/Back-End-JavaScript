const { default: mongoose } = require("mongoose")
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
    const cube = await Cube.findById(id).lean();

    return cube;
}

module.exports = cubeServices = {
    addCube,
    getAllCubes,
    getOneCube
}