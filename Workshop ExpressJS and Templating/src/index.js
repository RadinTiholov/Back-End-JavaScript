const express = require('express');
const handlebars  = require('express-handlebars');
const routes = require('./routes.js');
const app = express();

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(routes);

app.listen(6969, () => {console.log("The server is listening on port 6969");})