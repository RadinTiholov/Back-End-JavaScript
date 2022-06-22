const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true,
        minLength: 4
    },
    endPoint: {
        type: String,
        required: true,
        minLength: 4
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true,
        validate: {
            validator: function() {
                return this.carImage.startsWith('http://') || this.carImage.startsWith('https://')
            },
            message: 'The url should starts with http:// or https://'
        }
    },
    carBrand: {
        type: String,
        required: true,
        minLength: 4
    },
    seats: {
        type: Number,
        required: true,
        min: 0,
        max: 4
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    },
    buddies: [{
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    }]
});


const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;