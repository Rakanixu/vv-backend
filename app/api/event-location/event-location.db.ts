import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { EventLocation } from './event-location.model';

const EVENT_LOCATION = 'event_location';
const COLUMNS = [
    'id',
    'principal_id',
    'title',
    'remark',
    'street',
    'zip',
    'city',
    'opening_hours'
];

export class EventLocationDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getEventLocations() {
    return this.knex(EVENT_LOCATION).select(COLUMNS);
  }

  public async createEventLocation(eventLocation: EventLocation) {
    return this.knex(EVENT_LOCATION).insert(eventLocation).returning(COLUMNS);
  }

  public async getEventLocation(eventLocationId: number) {
    return this.knex(EVENT_LOCATION).where('id', eventLocationId).select(COLUMNS);
  }

  public async updateEventLocation(eventLocationId: number, eventLocation: EventLocation) {
    return this.knex(EVENT_LOCATION).where('id', eventLocationId).update(eventLocation).returning(COLUMNS);
  }

  public async deleteEventLocation(eventLocationId: number) {
    return this.knex.delete().from(EVENT_LOCATION).where('id', eventLocationId);
  }
}
