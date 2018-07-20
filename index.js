var co = require('co');

// Unhandled exception handler.
process.on('uncaughtException', (err) => {
    console.log(err);
});

co(function* () {
    // Wait for database to connect.
    yield require('./database').connect();
    console.log('Database connected.');

    // Run server.
    require('./server').listen(process.env.PORT);
    console.log('Server listening...');
}).catch((err) => {
    console.log(err);
});
