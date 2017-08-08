import * as IO from 'socket.io';
import * as ChatModel from './chat.model';
import { ChatDB } from './chat.db';

const USER_ID = 'user_id';
const chatDB = new ChatDB();
const ackOK: ChatModel.Acknowledge = { succesful: true };
const ackNOK: ChatModel.Acknowledge = { succesful: false };
const peopleOnRooms = {};

export function join(io: any, socket: any, chatUser: ChatModel.ChatUser) {
  // check required data exists at least. may not be valid.
  if (chatUser.event_id && chatUser.user_id) {
    console.log('join',  chatUser);

    socket.join(chatUser.event_id);

    peopleOnRooms[socket.id] = new ChatModel.User(chatUser.user_id, chatUser.user_name, chatUser.event_id, socket.id);

    const userJoining: ChatModel.UserAction = {
      user_id: chatUser.user_id,
      event_id: chatUser.event_id,
      user_name: chatUser.user_name,
      action: 'join'
    };

    socket.to(chatUser.event_id).emit('event_user', userJoining);
    socket.emit('aknowledge', ackOK);
  } else {
    socket.emit('aknowledge', ackNOK);
  }
}

export function leave(io: any, socket: any, chatUser: ChatModel.ChatUser) {
  console.log('leave', chatUser);

  const userLeaving: ChatModel.UserAction = {
    user_id: chatUser.user_id,
    event_id: chatUser.event_id,
    user_name: chatUser.user_name,
    action: 'leave'
  };

  socket.leave(chatUser.event_id);
  socket.to(chatUser.event_id).emit('event_user', userLeaving);
  socket.emit('aknowledge', ackOK);

  // remove user from pool
  delete peopleOnRooms[socket.id];
}

export function unicastMessage(io: any, socket: any, msg: ChatModel.UnicastMessage) {
  console.log('unicastMessage', msg);

  let to;
  for (const i in peopleOnRooms) {
    if (peopleOnRooms[i].id === msg.to_user_account_id) {
      to = peopleOnRooms[i].socketId;
    }
  }

  // check receiver is still connected
  if (to) {
    socket.to(to).emit('unicast_message', msg);
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

  if (peopleOnRooms[socket.id]) {
    const userLeaving: ChatModel.UserAction = {
      user_id: peopleOnRooms[socket.id].id,
      event_id: peopleOnRooms[socket.id].eventId,
      user_name: peopleOnRooms[socket.id].userName,
      action: 'leave'
    };

    socket.to(peopleOnRooms[socket.id].eventId).emit('event_user', userLeaving);
    // remove user from pool
    delete peopleOnRooms[socket.id];
  }
}
