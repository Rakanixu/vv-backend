import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Media } from './media.model';

const MEDIA = 'media';
const COLUMNS = [
  'id',
  'url'
];

export class MediaDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getMedias() {
    return this.knex(MEDIA).select(COLUMNS);
  }

  public async createMedia(Media: Media) {
    return this.knex(MEDIA).insert(Media).returning(COLUMNS);
  }

  public async getMedia(mediaId: number) {
    return this.knex(MEDIA).select(COLUMNS).where('id', mediaId);
  }

  public async updateMedia(mediaId: number, media: Media) {
    return this.knex(MEDIA).update(media).where('id', mediaId).returning(COLUMNS);
  }

  public async deleteMedia(mediaId: number) {
    return this.knex.delete().from(MEDIA).where('id', mediaId);
  }
}
