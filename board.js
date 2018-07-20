var Ssh2Client = require('ssh2').Client;

module.exports.getInfo = function (req, res) {
    var conn = new Ssh2Client();
    conn.on('ready', () => {
        conn.exec('/usr/local/bin/MtxBoardInfo', (err, stream) => {
            if (err) {
                throw err;
            }
            stream.on('close', () => {
                conn.end();
            }).on('data', (data) => {
                var strraw = data.toString();
                var lineraw = null;

                var productName = null;
                var serialNumber = null;
                var pcbNumber = null;

                const regexpProductName = /.*ProductName.*/m;
                lineraw = strraw.match(regexpProductName).toString();
                if (lineraw) {
                    productName = lineraw.substr(lineraw.indexOf(':') + 1).toString();
                }

                const regexpSerialNumber = /.*SerialNumber.*/m;
                lineraw = strraw.match(regexpSerialNumber).toString();
                if (lineraw) {
                    serialNumber = lineraw.substr(lineraw.indexOf(':') + 1).toString();
                }

                const regexpPcbNumber = /.*PcbNumber.*/m;
                lineraw = strraw.match(regexpPcbNumber).toString();
                if (lineraw) {
                    pcbNumber = lineraw.substr(lineraw.indexOf(':') + 1).toString();
                }

                res.json({
                    ProductName: productName,
                    SerialNumber: serialNumber,
                    PcbNumber: pcbNumber
                });
            }).stderr.on('data', (data) => {
                console.log(data.toString());
            });
        });
    }).connect({
        host: req.params.ip,
        port: 22,
        username: 'root',
        password: ''
    });
};
