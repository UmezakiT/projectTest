﻿require('rootpath')();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const PORT = process.env.PORT || 4000;


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

// api routes

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/users', require('./src/users/users.controller'));
app.use('/locations', require('./src/locations/locations.controller'));


// global error handler
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    // })
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'client/build/index.html'));
    })
}


// start server
// const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });

app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
