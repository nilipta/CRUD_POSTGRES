const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes_primary = require('./routes/config_routes_primary');
const routes_secondary = require('./routes/config_routes_secondary');
const routes_all = require('./routes/config_routes_all');
const config = require('./../config/config');

const app = express();


// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';

console.log(distDir);
//React server
app.use(express.static(path.join(__dirname, '../../node_modules/material-dashboard-react/dist')))
// app.use(/^((?!(api)).)*/, (req, res) => {
//     res.sendFile(path.join(__dirname, '../../dist/index.html'));
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API router
app.use('/api/all/', routes_all);
app.use('/api/primary/', routes_primary);
app.use('/api/secondary/', routes_secondary);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error(404)
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;