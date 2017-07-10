import { EventDB } from './event.db';
import { Event } from './event.model';

const eventDB = new EventDB();

export async function getEvents() {
  return eventDB.getEvents();
}

export async function createEvent(event: Event) {
  return eventDB.createEvent(event);
}

export async function getEvent(eventId: number) {
  return eventDB.getEvent(eventId);
}

export async function updateEvent(eventId: number, event: Event) {
  return eventDB.updateEvent(eventId, event);
}

export async function deleteEvent(eventId: number) {
  return eventDB.deleteEvent(eventId);
}
