import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Event } from './event.model';

const EVENT = 'event';
const COLUMNS = [
  'id',
  'principal_id',
  'user_account_id',
  'event_type_id',
  'title',
  'notes',
  'location',
  'preview_img',
  'created_at',
  'updated_at',
  'deleted_at',
  'event_background',
  'login_required',
  'latitude',
  'longitude',
  'date',
  'chat_highlight',
  'chat_with_user_image',
  'pose_question',
  'chat_shown_status_bar',
  'stage_moment_webcam'
];


export class EventDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getEvents() {
    return this.knex(EVENT).select(COLUMNS);
  }

  public async createEvent(event: Event) {
    return this.knex(EVENT).insert(event).returning(COLUMNS);
  }

  public async getEvent(eventId: number) {
    return this.knex(EVENT).select(COLUMNS).where('id', eventId);
  }

  public async updateEvent(eventId: number, event: Event) {
    return this.knex(EVENT).update(event).where('id', eventId).returning(COLUMNS);
  }

  public async deleteEvent(eventId: number) {
    return this.knex.delete().from(EVENT).where('id', eventId);
  }
}
