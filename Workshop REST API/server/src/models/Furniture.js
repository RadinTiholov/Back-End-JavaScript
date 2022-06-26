const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    make: {
        type: String,
        minLength: 4
    },
    model: {
        type: String,
        minLength: 4
    },
    year: {
        type: Number,
        min: 1950,
        max: 2050
    },
    description: {
        type: String,
        minLength: 10
    },
    price: {
        type: Number,
        min: 0
    },
    img: {
        type: String,
        required: true
    },
    material: {
        type: String
    }
});


const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;