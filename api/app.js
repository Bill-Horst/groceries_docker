const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const groceryRoutes = require('./groceries');

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('connected to db');
    })
    .catch((e) => {
        console.log('something wrong: ', e);
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:4200'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/groceries', groceryRoutes);

module.exports = app;