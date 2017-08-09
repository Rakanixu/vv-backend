import * as redis from 'socket.io-redis';
import { config } from './config/index';
import * as ChatEvents from './chat/index';

export function setupChat(io: any) {
  console.log('Setting up chat events');

  io.adapter(redis({ host: config.redisUrl, port: config.redisPort }));

  io
  .of(config.chatPathEndpoint)
  .on('connection', (socket: any) => {
    socket.on('join', ChatEvents.join.bind(null, io, socket));
    socket.on('leave', ChatEvents.leave.bind(null, io, socket));
    socket.on('unicast_message', ChatEvents.unicastMessage.bind(null, io, socket));
    socket.on('broadcast_message', ChatEvents.broadcastMessage.bind(null, io, socket));
    socket.on('disconnect', ChatEvents.disconnect.bind(null, io, socket));
  });
}
