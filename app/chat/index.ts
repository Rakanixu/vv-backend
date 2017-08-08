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

    socket[USER_ID] = chatUser.user_id;
    peopleOnRooms[chatUser.user_id] = new ChatModel.User(chatUser.user_id, chatUser.user_name, chatUser.event_id, socket.id);

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
  delete peopleOnRooms[chatUser.user_id];
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

  if (peopleOnRooms[socket[USER_ID]]) {
    const userLeaving: ChatModel.UserAction = {
      user_id: peopleOnRooms[socket[USER_ID]].id,
      event_id: peopleOnRooms[socket[USER_ID]].eventId,
      user_name: peopleOnRooms[socket[USER_ID]].user_name,
      action: 'leave'
    };

    socket.to(peopleOnRooms[socket[USER_ID]].event_id).emit('event_user', userLeaving);
    // remove user from pool
    delete peopleOnRooms[socket[USER_ID]];
  }
}
