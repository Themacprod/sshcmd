"use strict";

var ssh2Client = require("ssh2").Client;

module.exports.getCmdResult = function(req, res) {
    var conn = new ssh2Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
        conn.exec('ls', function(err, stream) {
            if (err) throw err;
            stream.on('close', function(code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', function(data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: req.body.ip,
        port: req.body.port,
        username: req.body.username,
        password: req.body.password
    });
};
