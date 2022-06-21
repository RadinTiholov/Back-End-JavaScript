const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 6,
        required: true
    },
    technique: {
        type: String,
        maxLength: 15,
        required: true
    },
    picture: {
        type: String,
        validate: {
            validator: function(){
                return this.picture.startsWith('http://') || this.picture.startsWith('https://');
            },
            message: "The link should starts wiht http"
        },
        required: true
    },
    certificate:{
        type:String,
        required: true,
        enum: ['Yes', 'No']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Publication = mongoose.model("Publication", publicationSchema);

module.exports = Publication;
