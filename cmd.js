"use strict";

var Ssh2Client = require("ssh2").Client;

module.exports.getCmdResult = function(req, res) {
    var conn = new Ssh2Client();
    conn.on("ready", function() {
        conn.exec(req.body.cmd, function(err, stream) {
            if (err) {
                throw err;
            }
            stream.on("close", function() {
                conn.end();
            }).on("data", function(data) {
                res.json(data.toString());
            }).stderr.on("data", function(data) {
                res.json(data.toString());
            });
        });
    }).connect({
        host: req.body.ip,
        port: 22,
        username: "root",
        password: ""
    });
};
