import * as IO from 'socket.io';
import { RedisClient } from 'redis';
import { UserAccountDB } from '../api/user-account/user-account.db';
import * as ChatModel from './chat.model';
import { ChatDB } from './chat.db';
import { config } from '../config/index';

const USER_ID = 'user_id';
const USER_KEYS = {
    USER_ID: 'id',
    USER_NAME: 'userName',
    EVENT_ID: 'eventId',
    SOCKET_ID: 'socketId'
};
const chatDB = new ChatDB();
const userAccountDB = new UserAccountDB();
const ackOK: ChatModel.Acknowledge = { succesful: true };
const ackNOK: ChatModel.Acknowledge = { succesful: false };
let redisClient = new RedisClient({ host: config.redisUrl, port: config.redisPort });

redisClient.on('error', function (err) {
    console.error('REDIS CLIENT ERROR: ' + err);
    redisClient = new RedisClient({ host: config.redisUrl, port: config.redisPort });
});

redisClient.on('reconnecting', function (err) {
    console.error('redis client reconnecting ');
    redisClient = new RedisClient({ host: config.redisUrl, port: config.redisPort });
});

export function join(io: any, socket: any, chatUser: ChatModel.ChatUser) {
  // check required data exists at least. may not be valid.
  if (chatUser.event_id && chatUser.user_id) {
    console.log('join',  chatUser);

    socket.join(chatUser.event_id);
    storeUser(socket.id, new ChatModel.User(chatUser.user_id, chatUser.user_name, chatUser.event_id, socket.id));

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

export function leave(io: any, socket: any) {
  console.log('leave', socket.id);

  retrieveUser(socket.id).then(function(user: ChatModel.User) {
    if (user) {
      const userLeaving: ChatModel.UserAction = {
        user_id: user.id,
        event_id: user.eventId,
        user_name: user.userName,
        action: 'leave'
      };

      socket.leave(user.eventId);
      socket.to(user.eventId).emit('event_user', userLeaving);
      socket.emit('aknowledge', ackOK);

      // remove user from pool
      deleteUser(socket.id, user.id, user.eventId);
    } else {
      socket.emit('aknowledge', ackNOK);
    }
  })
  .catch(function() {
    socket.emit('aknowledge', ackNOK);
  });
}

export function unicastMessage(io: any, socket: any, msg: ChatModel.UnicastMessage) {
  console.log('unicastMessage', msg);

  retrieveSocket(msg.to_user_account_id).then(function(socketId) {
    // check receiver is still connected
    if (socketId) {
      socket.to(socketId).emit('unicast_message', msg);
    }
  })
  .catch(function(err) {
    socket.emit('aknowledge', ackNOK);
  });
}

export function broadcastMessage(io: any, socket: any, msg: ChatModel.Message) {
  retrieveUser(socket.id).then(function(user: ChatModel.User) {
    // check room exists
    if (user && user.eventId) {
      console.log('broadcastMessage', msg);

      const bMsg: ChatModel.BroadcastMessage = {
        user_id: user.id,
        event_id: user.eventId,
        user_name: user.userName,
        message: msg.message,
      };

      chatDB.insertDocument(bMsg, ChatModel.Collections.broadcastMessage);
      socket.to(user.eventId).emit('broadcast_message', bMsg);
    } else {
      socket.emit('aknowledge', ackNOK);
    }
  })
  .catch(function(err) {
    socket.emit('aknowledge', ackNOK);
  });
}

export function getRoomUsers(io: any, socket: any) {
  const usersId: number[] = [];

  retrieveUser(socket.id).then(function(user: ChatModel.User) {
    if (user) {
      retrieveUsersInEventRoom(user.eventId).then(function(data) {
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          const userId = parseInt(keys[i], 10);
          if (!isNaN(userId)) {
            usersId.push(userId);
          }
        }

        // query DB to retrieve all users by ID
        userAccountDB.getUsersByIds(usersId).then(function(users: any) {
          socket.emit('users', users);
        })
        .catch(function(err) {
          socket.to(socket.id).emit('users', []);
        });
      })
      .catch(onRedisError);
    }
  })
  .catch(onRedisError);
}

export function disconnect(io: any, socket: any) {
  console.log('Client disconnected', socket.id);

  retrieveUser(socket.id).then(function(user: ChatModel.User) {
    if (user) {
      const userLeaving: ChatModel.UserAction = {
        user_id: user.id,
        event_id: user.eventId,
        user_name: user.userName,
        action: 'leave'
      };

      socket.to(user.eventId).emit('event_user', userLeaving);
      // remove user from redis
      deleteUser(socket.id, user.id, user.eventId);
    }
  })
  .catch(function(err) {
    console.error('ERROR RETRIEVING USER FROM REDIS: ', err);
  });
}

function storeUser(socketId: any, user: ChatModel.User) {
  redisClient.hset(socketId, USER_KEYS.USER_ID, user.id.toString());
  redisClient.hset(socketId, USER_KEYS.USER_NAME, user.userName);
  redisClient.hset(socketId, USER_KEYS.EVENT_ID, user.eventId.toString());
  // store socketId on user_id key for unicast purpose
  redisClient.hset(user.id.toString(), USER_KEYS.USER_ID, socketId);
  // store userIds on eventId hash to retrieve them easily
  redisClient.hset(user.eventId.toString(), user.id.toString(), user.id.toString());
}

async function retrieveUser(socketId: any) {
  return new Promise(function(resolve, reject) {
    redisClient.hgetall(socketId, function(err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

async function retrieveSocket(userId: number) {
  return new Promise(function(resolve, reject) {
    redisClient.hget(userId.toString(), USER_KEYS.USER_ID, function(err, socketId) {
      if (err) {
        reject(err);
      } else {
        resolve(socketId);
      }
    });
  });
}

async function retrieveUsersInEventRoom(eventId: number) {
  return new Promise(function(resolve, reject) {
    redisClient.hgetall(eventId.toString(), function(err, socketId) {
      if (err) {
        reject(err);
      } else {
        resolve(socketId);
      }
    });
  });
}

function deleteUser(socketId: any, userId: number, eventId: number) {
  redisClient.hdel(socketId, USER_KEYS.USER_ID);
  redisClient.hdel(socketId, USER_KEYS.USER_NAME);
  redisClient.hdel(socketId, USER_KEYS.EVENT_ID);
  redisClient.hdel(userId.toString(), USER_KEYS.USER_ID);
  redisClient.hdel(eventId.toString(), userId.toString());
}

function onRedisError(err: any) {
  console.error('ERROR RETRIEVING DATA FROM REDIS: ', err);
}

// fixme: we are pingin redis to avoid connect ECONNREFUSED in azurre instance
function heartbeat() {

  redisClient.ping(function(err, result) {
    if (err) {
      console.error('Redis ping returned err: ' + err);
    } else {
      console.log('Redis ping returned: ' + result);
    }
  });
}

setInterval(heartbeat, 59 * 1000);
