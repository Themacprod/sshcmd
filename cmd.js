"use strict";

var Ssh2Client = require("ssh2").Client,
    ping = require("ping"),
    _ = require("lodash");

var buildMtxI2cCmd = function(params) {
    var cmd = "/usr/local/bin/MtxI2cTool ";
    cmd += ("-b " + params.bus + " ");
    cmd += ("-a " + params.address + " ");

    if (params.offsetsize === 8) {
        cmd += ("-o8 " + params.startoffset + " ");
    } else {
        cmd += ("-o16 " + params.startoffset + " ");
    }

    cmd += ("-r " + params.datacount);

    return cmd;
};

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

module.exports.i2cread = function(req, res) {
    var conn = new Ssh2Client();
    conn.on("ready", function() {
        conn.exec(buildMtxI2cCmd(req.body), function(err, stream) {
            if (err) {
                throw err;
            }
            stream.on("close", function() {
                conn.end();
            }).on("data", function(data) {
                // Only return data because I2C tool return offset + data.
                var extracted = _.map(data.toString().split("\n"), function(line) {
                    return line.slice(5, 9);
                });

                // Remove extra empty line, valid data value (0xXX) as length of 4.
                extracted = _.filter(extracted, function(o) {
                    return (o.length === 4);
                });

                res.json({
                    startoffset: req.body.startoffset,
                    data: extracted
                });
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

module.exports.pingIp = function(req, res) {
    ping.promise.probe(req.params.ip, {
            timeout: 0.5
        })
        .then(function(res2) {
            res.json(res2.alive);
        })
        .done();
};
