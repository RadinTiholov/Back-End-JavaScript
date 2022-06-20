const express = require('express');
const hbs = require('express-handlebars');
const {PORT} = require('./config/env.js');
const routes = require('./routes');
const path = require('path');
const dbInit = require('./config/initDb.js')
const cookieParser = require('cookie-parser');
const {auth} = require('./middlewares/authMiddleware');

const app = express();

//Default settings for properly running app
app.use(express.urlencoded({extended: false}));
app.use(express.static('src/public'));
app.use(cookieParser());
app.use(auth);
app.use(routes);

//Init the hbs
app.engine('hbs', hbs.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Init the db
dbInit();
app.listen(PORT, () => {console.log(`The server is listening on port ${PORT}`);})