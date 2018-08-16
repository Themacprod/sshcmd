const mongoClient = require('mongodb').MongoClient;

module.exports.connect = () => {
    console.log(`Connecting to ${process.env.MONGODB_URL} ...`);

    const promise = mongoClient.connect(
        process.env.MONGODB_URL,
        { useNewUrlParser: true }
    );

    return promise.then((database) => {
        console.log('Database connected.');

        const currentDb = database.db('SshCmd');

        module.exports.instance = currentDb;
        module.exports.registers = currentDb.collection('registers');
    });
};
