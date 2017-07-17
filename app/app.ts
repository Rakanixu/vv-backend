import { Server } from './server';
import * as http from 'http';
import * as fs from 'fs';
import * as IO from 'socket.io';
import * as chat from './chat';
import { config } from './config';

const appPort = parseInt(process.env.APP_PORT || config.port, 10);

// signal handlers
process.on('SIGINT', function () {
    console.log('Caught interrupt signal');
    process.exit();
});

/* Server initialization */
const server = new Server();
server.initialize() /* tslint:disable:no-floating-promises */
.then(function(app: any) {
    app.set('port', appPort);
    const httpServer = http.createServer(app);

    // instantiate socket.io
    this.io = IO(httpServer);

    // add socket events
    chat.setupChat(this.io);

    httpServer.on('listening', () => {
        console.log('Server listening on port %d', appPort);
    });

    httpServer.listen(appPort);
}.bind(server))
.catch(err => console.log('Error setting up server:', err));

