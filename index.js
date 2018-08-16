var co = require('co');
const database = require('./database');
const server = require('./server');

// Unhandled exception handler.
process.on('uncaughtException', (err) => {
    console.log(err);
});

co(function* () {
    // Wait for database to connect.
    yield database.connect();

    // Run server.
    const port = process.env.PORT || 5019;
    server.listen(port);
    console.log(`Server listening on port ${port} ...`);
}).catch((err) => {
    console.error(err);
});
