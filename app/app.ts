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
    let httpsServer;
    try {
        httpsServer = https.createServer({
            key: fs.readFileSync('/src/app/key.pem', 'utf8'),
            cert: fs.readFileSync('/src/app/cert.pem', 'utf8'),
            passphrase: '19956476'
        }, app);
    } catch (e) {
        console.log('https.createServer', e);
    }
    // instantiate socket.io
    this.io = IO(httpServer);
    // add socket events
    chat.setupChat(this.io);

    try {
        this.iosecure = IO(httpsServer);
        chat.setupChat(this.iosecure);
    } catch (e) {
        console.log(e);
    }

    httpServer.on('listening', () => {
        console.log('Server listening on port %d', config.port);
    });

    httpServer.listen(config.port);

    try {
        httpsServer.on('listening', () => {
            console.log('Secure Server listening on port %d', config.securePort);
        });

        httpsServer.listen(config.securePort);
    } catch (e) {
        console.log(e);
    }
}.bind(server))
.catch(err => console.log('Error setting up server:', err));

