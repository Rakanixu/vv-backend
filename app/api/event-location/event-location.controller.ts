import { EventLocationDB } from './event-location.db';
import { EventLocation } from './event-location.model';

const eventLocationDB = new EventLocationDB();

export async function getEventLocations(principalId: number) {
  return eventLocationDB.getEventLocations(principalId);
}

export async function createEventLocation(principalId: number, eventLocation: EventLocation) {
  return eventLocationDB.createEventLocation(principalId, eventLocation);
}

export async function getEventLocation(principalId: number, eventLocationId: number) {
  return eventLocationDB.getEventLocation(principalId, eventLocationId);
}

export async function updateEventLocation(principalId: number, eventLocationId: number, eventLocation: EventLocation) {
  return eventLocationDB.updateEventLocation(principalId, eventLocationId, eventLocation);
}

export async function deleteEventLocation(principalId: number, eventLocationId: number) {
  return eventLocationDB.deleteEventLocation(principalId, eventLocationId);
}
