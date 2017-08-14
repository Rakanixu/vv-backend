import { EB } from 'tribecast-integration-nodejs';
import { EventDB } from './event.db';
import { Event, EventTokenRequest } from './event.model';
import { UserAccount } from '../user-account/user-account.model';
import { config } from '../../config';

const eventDB = new EventDB();

export async function getEvents(principalId: number) {
  return eventDB.getEvents(principalId);
}

export async function createEvent(principalId: number, event: Event) {
  return eventDB.createEvent(principalId, event);
}

export async function getEvent(principalId: number, eventId: number) {
  return eventDB.getEvent(principalId, eventId);
}

export async function updateEvent(principalId: number, eventId: number, event: Event) {
  return eventDB.updateEvent(principalId, eventId, event);
}

export async function deleteEvent(principalId: number, eventId: number) {
  return eventDB.deleteEvent(principalId, eventId);
}

export async function startEvent(principalId: number, eventId: number) {
  if (!config.tribecast) {
    throw new Error('Session couldnt be started. Config not ready.');
  }

  const events: Event[] = await eventDB.getEvent(principalId, eventId);
  if (!events || events.length === 0) {
    throw new Error('Event not found');
  }
  const event: Event = events[0];

  const roomId: string = EB.generateRoomId(config.tribecast.apiKey,
    config.tribecast.useBroadcast, null, '320x200',
    EB.COMPOSITION_MODE_VERTICAL_LEFT, config.tribecast.secret);

  if (!roomId) {
    throw new Error('Session couldnt be started');
  }
  event.tribecast_room_id = roomId;
  event.started_at = (new Date()).toISOString();
  event.ended_at = null;

  return eventDB.updateEvent(principalId, eventId, event);
}

export async function stopEvent(principalId: number, eventId: number) {
  const events: Event[] = await eventDB.getEvent(principalId, eventId);
  if (!events || events.length === 0) {
    throw new Error('Event not found');
  }
  const event: Event = events[0];

  event.tribecast_room_id = '';
  event.ended_at = (new Date()).toISOString();

  return eventDB.updateEvent(principalId, eventId, event);
}

export async function generateEventToken(principalId: number, eventId: number, tokenReq: EventTokenRequest) {
  if (!config.tribecast) {
    throw new Error('Session couldnt be started. Config not ready.');
  }

  const events: Event[] = await eventDB.getEvent(principalId, eventId);
  if (!events || events.length === 0) {
    throw new Error('Event not found');
  }
  const event: Event = events[0];

  if (!event.tribecast_room_id) {
    throw new Error('Event is not started');
  }
  let type: string = 'subscriber';
  if (tokenReq && tokenReq.type) {
    type = tokenReq.type;
  }
  console.log('Generating token for user type ' + JSON.stringify(type));
  const token: string = EB.generateToken(event.tribecast_room_id, config.tribecast.apiKey,
    (new Date()).getTime() + config.tribecast.tokensDuration, type,
    config.tribecast.secret);

    return token;
}
