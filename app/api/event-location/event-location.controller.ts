import { EventLocationDB } from './event-location.db';
import { EventLocation } from './event-location.model';

const eventLocationDB = new EventLocationDB();

export async function getEventLocations() {
  return eventLocationDB.getEventLocations();
}

export async function createEventLocation(eventLocation: EventLocation) {
  return eventLocationDB.createEventLocation(eventLocation);
}

export async function getEventLocation(eventLocationId: number) {
  return eventLocationDB.getEventLocation(eventLocationId);
}

export async function updateEventLocation(eventLocationId: number, eventLocation: EventLocation) {
  return eventLocationDB.updateEventLocation(eventLocationId, eventLocation);
}

export async function deleteEventLocation(eventLocationId: number) {
  return eventLocationDB.deleteEventLocation(eventLocationId);
}
