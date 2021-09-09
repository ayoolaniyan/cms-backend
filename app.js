const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const placesRoutes = require('./routes/places');
const bookingRoutes = require('./routes/bookings');

const app = express();

mongoose.connect('mongodb+srv://eweb:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster0-uzcql.mongodb.net/cms?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images", express.static());
app.use("/images", express.static(path.join("files/images")));
// app.use("/photos", express.static(path.join("files/photos")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/bookings', bookingRoutes);


module.exports = app;