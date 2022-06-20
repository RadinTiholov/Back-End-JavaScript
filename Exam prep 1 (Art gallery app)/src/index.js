const express = require('express');
const hbs = require('express-handlebars');
const {PORT} = require('./config/env.js');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static('src/public'));
app.use(routes);

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {console.log(`The server is listening on port ${PORT}`);})