export interface ChatUser {
  user_id: number;
  event_id: number;
  user_name: string;
}

export interface UserAction {
  user_id: number;
  event_id: number;
  user_name: string;
  action: string;
}

export interface UnicastMessage {
  user_id: number;
  event_id: number;
  user_name: string;
  to_user_account_id: number;
  message: string;
}

export interface Message {
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
  public userName: string;
  public eventId: number;
  public socketId: number;

  constructor(id: number, userName: string, eventId: number, socketId: number) {
    this.id = id;
    this.userName = userName;
    this.eventId = eventId;
    this.socketId = socketId;
  }
}

export class UserEventData {
  public user_action: UserAction;
  public date: number;

  constructor(userAction: UserAction) {
    this.user_action = userAction;
    this.date = new Date().getTime();
  }
}

export const Collections = {
  broadcastMessage: 'broadcast_message',
  unicastMessage: 'unicast_message',
  userEventMetrics: 'user_event_metrics'
};
