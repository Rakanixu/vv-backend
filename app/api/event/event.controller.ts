import { EventDB } from './event.db';
import { Event } from './event.model';

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
