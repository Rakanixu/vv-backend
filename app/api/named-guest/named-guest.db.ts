import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { NamedGuest } from './named-guest.model';

const NAMED_GUEST = 'named_guest';
const COLUMNS = [
  'id',
  'event_id',
  'main_media_type_id',
  'name',
  'main_media',
  'media_start_time',
  'media_end_time',
  'description',
 'main_media_file'
];

export class NamedGuestDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getNamedGuests(eventId: number) {
    return this.knex(NAMED_GUEST).select(COLUMNS).where('event_id', eventId);
  }

  public async createNamedGuest(eventId: number, namedGuest: NamedGuest) {
    namedGuest.event_id = eventId;
    return this.knex(NAMED_GUEST).insert(namedGuest).returning(COLUMNS);
  }

  public async getNamedGuest(eventId: number, namedGuestId: number) {
    return this.knex(NAMED_GUEST).select(COLUMNS).where('event_id', eventId).where('id', namedGuestId);
  }

  public async updateNamedGuest(eventId: number, namedGuestId: number, namedGuest: NamedGuest) {
    return this.knex(NAMED_GUEST).update(namedGuest).where('event_id', eventId).where('id', namedGuestId).returning(COLUMNS);
  }

  public async deleteNamedGuest(eventId: number, namedGuestId: number) {
    return this.knex.delete().from(NAMED_GUEST).where('event_id', eventId).where('id', namedGuestId);
  }
}
