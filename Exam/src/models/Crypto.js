const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function() {
                return this.image.startsWith('http://') || this.image.startsWith('https://')
            },
            message: 'The url should starts with http:// or https://'
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },
    buyACrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;