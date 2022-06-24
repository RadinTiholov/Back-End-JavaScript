const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 6
    },
    type: {
        type: String,
        required: true,
        enum: ['Apartment', 'Villa', 'House']
    },
    year: {
        type: Number,
        required: true,
        min: 1850,
        max: 2021
    },
    city: {
        type: String,
        required: true,
        minLength: 4
    },
    homeImage: {
        type: String,
        required: true,
        validate: {
            validator: function() {
                return this.carImage.startsWith('http://') || this.carImage.startsWith('https://')
            },
            message: 'The url should starts with http:// or https://'
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 60
    },
    availablePieces: {
        type: Number,
        required: true,
        min : 0,
        max: 10
    },
    renredAHome: [{
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Housing = mongoose.model("Housing", housingSchema);

module.exports = Housing;