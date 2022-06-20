const mongoose = require('mongoose');
const { DB_STRING }= require('./env.js');

mongoose.connect(DB_STRING)
.then(() => {
    console.log("DB connected");
})
.catch(() => {
    console.log("Failed to connect to DB");
});;