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

  public async getEventLocations(principalId: number) {
    return this.knex(EVENT_LOCATION).where('principal_id', principalId).select(COLUMNS);
  }

  public async createEventLocation(principalId: number, eventLocation: EventLocation) {
    eventLocation.principal_id = principalId;
    return this.knex(EVENT_LOCATION).insert(eventLocation).returning(COLUMNS);
  }

  public async getEventLocation(principalId: number, eventLocationId: number) {
    return this.knex(EVENT_LOCATION).where('principal_id', principalId).where('id', eventLocationId).select(COLUMNS);
  }

  public async updateEventLocation(principalId: number, eventLocationId: number, eventLocation: EventLocation) {
    return this.knex(EVENT_LOCATION)
      .where('principal_id', principalId)
      .where('id', eventLocationId)
      .update(eventLocation)
      .returning(COLUMNS);
  }

  public async deleteEventLocation(principalId: number, eventLocationId: number) {
    return this.knex.delete().from(EVENT_LOCATION).where('principal_id', principalId).where('id', eventLocationId);
  }
}
