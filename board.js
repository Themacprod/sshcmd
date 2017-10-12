"use strict";

var Ssh2Client = require("ssh2").Client;

module.exports.getInfo = function(req, res) {
    var conn = new Ssh2Client();
    conn.on("ready", function() {
        conn.exec("/usr/local/bin/MtxBoardInfo", function(err, stream) {
            if (err) {
                throw err;
            }
            stream.on("close", function() {
                conn.end();
            }).on("data", function(data) {
                var strraw = data.toString();
                var lineraw = null;

                var productName = null;
                var serialNumber = null;
                var pcbNumber = null;

                var regexpProductName = /.*ProductName.*/m;
                lineraw = strraw.match(regexpProductName).toString();
                if (lineraw) {
                    productName = lineraw.substr(lineraw.indexOf(":") + 1).toString();
                }

                var regexpSerialNumber = /.*SerialNumber.*/m;
                lineraw = strraw.match(regexpSerialNumber).toString();
                if (lineraw) {
                    serialNumber = lineraw.substr(lineraw.indexOf(":") + 1).toString();
                }

                var regexpPcbNumber = /.*PcbNumber.*/m;
                lineraw = strraw.match(regexpPcbNumber).toString();
                if (lineraw) {
                    pcbNumber = lineraw.substr(lineraw.indexOf(":") + 1).toString();
                }

                res.json({
                    ProductName: productName,
                    SerialNumber: serialNumber,
                    PcbNumber: pcbNumber
                });
            }).stderr.on("data", function(data) {
                console.log(data.toString());
            });
        });
    }).connect({
        host: req.params.ip,
        port: 22,
        username: "root",
        password: ""
    });
};
