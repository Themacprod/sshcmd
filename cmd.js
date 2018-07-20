var Ssh2Client = require('ssh2').Client,
    ping = require('ping'),
    _ = require('lodash');

var buildI2cReadCmd = function (params) {
    var cmd = '/usr/local/bin/MtxI2cTool ';
    cmd += (`-b ${params.bus} `);
    cmd += (`-a ${params.address} `);
    cmd += (`-o ${params.offsetsize} ${params.startoffset} `);
    cmd += (`-r ${params.datacount}`);

    return cmd;
};

var buildI2cWriteCmd = function (params) {
    var cmd = '/usr/local/bin/MtxI2cTool ';
    cmd += (`-b ${params.bus} `);
    cmd += (`-a ${params.address} `);
    cmd += (`-o ${params.offsetsize} ${params.startoffset} `);
    cmd += (`-w ${params.data}`);

    return cmd;
};

module.exports.i2cread = function (req, res) {
    ping.promise.probe(req.body.ip, {
        timeout: 0.1
    })
        .then((res2) => {
            if (res2.alive === true) {
                const conn = new Ssh2Client();
                conn.on('ready', () => {
                    conn.exec(buildI2cReadCmd(req.body), (err, stream) => {
                        if (err) {
                            throw err;
                        }
                        stream.on('close', () => {
                            conn.end();
                        }).on('data', (data) => {
                            // Only return data because I2C tool return offset + data.
                            var extracted = _.map(data.toString().split('\n'), (line) => {
                                return line.slice(5, 9);
                            });

                            // Remove extra empty line, valid data value (0xXX) as length of 4.
                            extracted = _.filter(extracted, (o) => {
                                return (o.length === 4);
                            });

                            res.json({
                                startoffset: req.body.startoffset,
                                data: extracted
                            });
                        }).stderr.on('data', (data) => {
                            res.json(data.toString());
                        });
                    });
                }).connect({
                    host: req.body.ip,
                    port: 22,
                    username: 'root',
                    password: ''
                });
            }
        })
        .done();
};

module.exports.i2cwrite = function (req, res) {
    ping.promise.probe(req.body.ip, {
        timeout: 0.1
    })
        .then((res2) => {
            if (res2.alive === true) {
                const conn = new Ssh2Client();
                conn.on('ready', () => {
                    conn.exec(buildI2cWriteCmd(req.body), (err, stream) => {
                        if (err) {
                            throw err;
                        }
                        stream.on('close', () => {
                            conn.end();
                        }).on('data', () => {
                            res.end();
                        }).stderr.on('data', () => {
                            res.end();
                        });
                    });
                }).connect({
                    host: req.body.ip,
                    port: 22,
                    username: 'root',
                    password: ''
                });
            }
        })
        .done();
};

module.exports.pingIp = function (req, res) {
    ping.promise.probe(req.params.ip, {
        timeout: 0.5
    })
        .then((res2) => {
            res.json(res2.alive);
        })
        .done();
};
