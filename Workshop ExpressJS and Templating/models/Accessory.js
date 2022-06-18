const mongoose = require('mongoose');

const accessoryScheme = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        minlength : 5,
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
    description: {
        type: String,
        required: true,
        minlength: 20,
        validate: /[a-zA-z0-9]/g
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