const mongoose = require('mongoose');

const accessoryScheme = new mongoose.Schema({
    name: {
        type : String,
        required: true
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
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    cubes : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cube'
        }
    ]
})

const Accessory = mongoose.model("Accessory", accessoryScheme);

module.exports = Accessory;