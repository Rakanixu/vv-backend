import * as IO from 'socket.io';
import * as ChatModel from './chat.model';
import { ChatDB } from './chat.db';

const USER_ID = 'user_id';
const chatDB = new ChatDB();
const ackOK: ChatModel.Acknowledge = { succesful: true };
const ackNOK: ChatModel.Acknowledge = { succesful: false };
const peopleOnRooms = {};

export function join(io: any, socket: any, joinRoom: ChatModel.JoinRoom) {
  // check required data exists at least. may not be valid.
  if (joinRoom.event_id && joinRoom.user_id) {
    console.log('join',  joinRoom);

    socket.join(joinRoom.event_id);

    socket[USER_ID] = joinRoom.user_id;
    peopleOnRooms[joinRoom.user_id] = new ChatModel.User(joinRoom.user_id, joinRoom.event_id, socket.id);

    socket.emit('aknowledge', ackOK);
  } else {
    socket.emit('aknowledge', ackNOK);
  }
}

export function leave(io: any, socket: any, leaveRoom: ChatModel.LeaveRoom) {
  console.log('leave', leaveRoom);

  socket.leave(leaveRoom.event_id);
  socket.emit('aknowledge', ackOK);

  // remove user from pool
  delete peopleOnRooms[leaveRoom.user_id];
}

export function unicastMessage(io: any, socket: any, msg: ChatModel.UnicastMessage) {
  console.log('unicastMessage', msg);

  // check receiver is still connected
  if (peopleOnRooms[msg.to_user_account_id] && peopleOnRooms[msg.to_user_account_id].socketId) {
    socket.to(peopleOnRooms[msg.to_user_account_id].socketId).emit('unicast_message', msg);
  }
}

export function broadcastMessage(io: any, socket: any, msg: ChatModel.BroadcastMessage) {
  // check room exists
  if (msg.event_id) {
    console.log('broadcastMessage', msg);

    chatDB.insertDocument(msg, ChatModel.Collections.broadcastMessage);
    socket.to(msg.event_id).emit('broadcast_message', msg);
  }
}

export function disconnect(io: any, socket: any) {
  console.log('Client disconnected', socket.id);

  // remove user from pool
  delete peopleOnRooms[socket[USER_ID]];
}
