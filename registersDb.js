const database = require('./database');

module.exports.getDeviceType = function (req, res) {
    const promise = new Promise(function (resolve) {
        database.instance.listCollections().toArray().then((collections) => {
            resolve(collections.map((collection) => {
                return collection.name;
            }));
        });
    });

    promise.then(function (values) {
        console.log(values);
        res.json({
            deviceType: values
        });
    });
};

module.exports.getRegistersList = function (req, res) {
    database.instance.collection(`${req.params.deviceType}`).findOne({
        device: `${req.params.deviceType}`
    }, function (err, doc) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.json(doc.registers);
        }
    });
};
