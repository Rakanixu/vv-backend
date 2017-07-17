export interface JoinRoom {
  user_id: number;
  event_id: number;
  user_name: string;
}

export interface LeaveRoom {
  user_id: number;
  event_id: number;
}

export interface UnicastMessage {
  user_id: number;
  event_id: number;
  user_name: string;
  to_user_account_id: number;
  message: string;
}

export interface BroadcastMessage {
  user_id: number;
  event_id: number;
  user_name: string;
  message: string;
}

export interface Acknowledge {
  succesful: boolean;
}

export class User {
  public id: number;
  public eventId: number;
  public socketId: number;

  constructor(id: number, eventId: number, socketId: number) {
    this.id = id;
    this.eventId = eventId;
    this.socketId = socketId;
  }
}

export const Collections = {
  broadcastMessage: 'broadcast_message',
  unicastMessage: 'unicast_message'
};
