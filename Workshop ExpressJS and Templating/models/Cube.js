const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        minlength : 5,
        validate: /[a-zA-z0-9]/g
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        validate: /[a-zA-z0-9]/g
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(){
                return this.imageUrl.startsWith('http');
            },
            message: "The link should starts wiht http"
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ],
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;