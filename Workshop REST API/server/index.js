const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes.js');

const { PORT } = require('./src/config/env');
const { DB_STRING }= require('./src/config/env.js');
const corsMiddleware = require('./src/middlewares/corsMiddleware.js');

const app = express();

app.use(express.json());
app.use(corsMiddleware());
app.use(routes);

mongoose.connect(DB_STRING)
    .then(() => {
        console.log("DB connected");
    })
    .catch(() => {
        console.log("Failed to connect to DB");
    });

app.listen(PORT, () => {console.log(`The server is listening on port ${PORT}`);})