require('appmetrics-dash').attach();

const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');
const request = require('request')

const logger = log4js.getLogger(appName);
logger.level = process.env.LOG_LEVEL || 'info'
const app = express();
const server = http.createServer(app);

app.use(log4js.connectLogger(logger, { level: logger.level }));
require('./routers/index')(app, server);

// Add your code here

var debug = false;
const apikey = "2276454694917418ea5bacdffa49e101";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/getWeather', (req, res) => {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var getCity = req.query.getCity;

    if (getCity != null) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + getCity + "&appid=" + apikey;
    }

    if (lat != null && lon != null) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
    }

    if (getCity != null && lat != null || getCity != null && lat != null || getCity != null && lat != null && lon != null) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + getCity + "&appid=" + apikey;
    }

    var options = {
        url: url
    };

    request.post(options, function(error, response, body) {
        if (!error) {

            if (debug) {
                console.log("\n::: Response from Weather Api :::\n");
                console.log(body);
                console.log("\n::: ------------------------- :::\n");
            }

            res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': body.length });
            res.write(body);
            res.end();
        } else
            console.log("erroror Occured: " + error);
    });
});


const port = process.env.PORT || localConfig.port;
server.listen(port, function() {
    logger.info(`node listening on http://localhost:${port}`);
});

app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function(err, req, res, next) {
    res.sendFile(path.join(__dirname, '../public', '500.html'));
});

module.exports = server;