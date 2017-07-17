import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { SliderImage } from './slider-image.model';

const SLIDER_IMAGE = 'slider_image';
const COLUMNS = [
  'id',
  'event_id',
  'title',
  'type',
  'img'
];

export class SliderImageDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getSliderImages(eventId: number) {
    return this.knex(SLIDER_IMAGE).select(COLUMNS).where('event_id', eventId);
  }

  public async createSliderImage(eventId: number, sliderImage: SliderImage) {
    sliderImage.event_id = eventId;
    return this.knex(SLIDER_IMAGE).insert(sliderImage).returning(COLUMNS);
  }

  public async getSliderImage(eventId: number, sliderImageId: number) {
    return this.knex(SLIDER_IMAGE).select(COLUMNS).where('event_id', eventId).where('id', sliderImageId);
  }

  public async updateSliderImage(eventId: number, sliderImageId: number, sliderImage: SliderImage) {
    return this.knex(SLIDER_IMAGE).update(sliderImage).where('event_id', eventId).where('id', sliderImageId).returning(COLUMNS);
  }

  public async deleteSliderImage(eventId: number, sliderImageId: number) {
    return this.knex.delete().from(SLIDER_IMAGE).where('event_id', eventId).where('id', sliderImageId);
  }
}
