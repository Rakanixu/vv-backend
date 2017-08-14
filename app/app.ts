import { Server } from './server';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as IO from 'socket.io';
import * as chat from './chat';
import { config } from './config';

// signal handlers
process.on('SIGINT', function () {
    console.log('Caught interrupt signal');
    process.exit();
});

/* Server initialization */
const server = new Server();
server.initialize() /* tslint:disable:no-floating-promises */
.then(function(app: any) {
    app.set('port', config.securePort);
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer({
        key: fs.readFileSync('/src/app/key.pem'),
        cert: fs.readFileSync('/src/app/cert.pem')
    }, app);
    // instantiate socket.io
    this.io = IO(httpServer);

    // add socket events
    chat.setupChat(this.io);

    httpServer.on('listening', () => {
        console.log('Server listening on port %d', config.port);
    });

    httpsServer.on('listening', () => {
        console.log('Secure Server listening on port %d', config.securePort);
    });

    httpServer.listen(config.port);
    httpsServer.listen(config.securePort);
}.bind(server))
.catch(err => console.log('Error setting up server:', err));

