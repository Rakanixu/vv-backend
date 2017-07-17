import { NamedGuestDB } from './named-guest.db';
import { NamedGuest } from './named-guest.model';

const namedGuestDB = new NamedGuestDB();

export async function getNamedGuests(eventId: number) {
  return namedGuestDB.getNamedGuests(eventId);
}

export async function createNamedGuests(eventId: number, nameGuest: NamedGuest) {
  return namedGuestDB.createNamedGuest(eventId, nameGuest);
}

export async function getNamedGuest(eventId: number, nameGuestId: number) {
  return namedGuestDB.getNamedGuest(eventId, nameGuestId);
}

export async function updateNamedGuest(eventId: number, nameGuestId: number, nameGuest: NamedGuest) {
  return namedGuestDB.updateNamedGuest(eventId, nameGuestId, nameGuest);
}

export async function deleteNamedGuest(eventId: number, nameGuestId: number) {
  return namedGuestDB.deleteNamedGuest(eventId, nameGuestId);
}
