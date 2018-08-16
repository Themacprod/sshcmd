const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const cmd = require('./cmd');
const board = require('./board');
const registersDb = require('./registersDb');

const server = express();
const cacheMaxAge = process.env.NODE_ENV === 'development' ? 0 : 3600000;

// Server setup.

server.use(favicon(path.join(__dirname, 'public/img/favicon-32x32.png'), {
    maxAge: cacheMaxAge
}));

server.use(express.query());

server.use(bodyParser.json());

// server.use(bodyParser.urlencoded({
//     extended: false
// }));

server.use(cookieParser());

server.use(express.static(path.join(__dirname, 'public'), {
    maxAge: cacheMaxAge
}));

server.get('/api/getDeviceType', registersDb.getDeviceType);

server.get('/api/:deviceType/getRegistersList', registersDb.getRegistersList);

server.post('/api/i2cread', cmd.i2cread);

server.post('/api/i2cwrite', cmd.i2cwrite);

server.get('/api/ping/:ip', cmd.pingIp);

server.get('/api/board/:ip', board.getInfo);

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Unhandled exception handler.
server.use((err, req, res) => {
    console.error(err);
    res.sendStatus(500);
});

module.exports = server;
