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
  'subtitle',
  'speaker_media_type',
  'speaker_media',
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
  'stage_moment_webcam',
  'chat_highlight_price',
  'chat_with_user_image_price',
  'pose_question_price',
  'chat_shown_status_bar_price',
  'stage_moment_webcam_price',
  'tribecast_room_id',
  'started_at',
  'ended_at'
];

export class EventDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getEvents(principalId: number) {
    return this.knex(EVENT).select(COLUMNS)
      .where('principal_id', principalId)
      .whereNot('deleted', true)
      .orWhere('deleted', null);
  }

  public async createEvent(principalId: number, event: Event) {
    event.principal_id = principalId;
    return this.knex(EVENT).insert(event).returning(COLUMNS);
  }

  public async getEvent(principalId: number, eventId: number) {
    return this.knex(EVENT).select(COLUMNS)
      .where('principal_id', principalId)
      .where('id', eventId)
      .where('deleted', null)
      .orWhere('deleted', false);
  }

  public async updateEvent(principalId: number, eventId: number, event: Event) {
    return this.knex(EVENT).update(event).where('principal_id', principalId).where('id', eventId).returning(COLUMNS);
  }

  public async deleteEvent(principalId: number, eventId: number) {
    return this.knex(EVENT).update({ deleted: true }).where('principal_id', principalId).where('id', eventId);
  }
}
