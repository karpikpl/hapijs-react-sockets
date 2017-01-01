'use strict';

const Composer = require('./index');
const SocketIO = require('socket.io');
let io;

Composer((err, server) => {

    if (err) {
        throw err;
    }

    server.start((error) => {

        if (error) {
            throw error;
        }

        console.log('Started the plot device on port ' + server.info.port);

        // listener - the http/hapi server object.
    io = SocketIO.listen(server.listener);

    io.on('connection', (socket) => {

        console.log('a user connected');

        socket.on('disconnect', _ => {
            console.log('user disconnected');
        });

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
            console.log('message: ' + msg);
        });
    });
    });

    setInterval(()=> {
        io.emit('chat message', 'Current date from server is: '+ new Date().toLocaleTimeString());
    },3000);
});
