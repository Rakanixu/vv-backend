import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Media } from './media.model';

const MEDIA = 'media';
const COLUMNS = [
  'id',
  'principal_id',
  'url'
];

export class MediaDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getMedias(principalId: number) {
    return this.knex(MEDIA).select(COLUMNS).where('principal_id', principalId);
  }

  public async createMedia(principalId: number, media: Media) {
    media.principal_id = principalId;
    return this.knex(MEDIA).insert(media).returning(COLUMNS);
  }

  public async getMedia(principalId: number, mediaId: number) {
    return this.knex(MEDIA).select(COLUMNS).where('principal_id', principalId).where('id', mediaId);
  }

  public async updateMedia(principalId: number, mediaId: number, media: Media) {
    return this.knex(MEDIA)
      .update(media)
      .where('principal_id', principalId)
      .where('id', mediaId)
      .returning(COLUMNS);
  }

  public async deleteMedia(principalId: number, mediaId: number) {
    return this.knex.delete().from(MEDIA).where('principal_id', principalId).where('id', mediaId);
  }
}
