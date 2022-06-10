const express = require('express');
const handlebars  = require('express-handlebars');
const routes = require('./routes.js');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
const {auth} = require('../middlewares/authMiddleware');
const app = express();

const connectionString = 'mongodb://localhost:27017/cubicle';

//Static files config
app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: false}));

//Cookie parser config
app.use(cookieParser());
//Handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

//Mongoose config
mongoose.connect(connectionString)
    .then(() => {
        console.log("DB connected");
    })
    .catch(() => {
        console.log("Failed to connect to DB");
    });

app.use(auth);
app.use(routes);

app.listen(6969, () => {console.log("The server is listening on port 6969");})