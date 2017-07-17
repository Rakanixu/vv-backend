import { SliderImageDB } from './slider-image.db';
import { SliderImage } from './slider-image.model';

const sliderImageDB = new SliderImageDB();

export async function getSliderImages(eventId: number) {
  return sliderImageDB.getSliderImages(eventId);
}

export async function createSliderImage(eventId: number, sliderImage: SliderImage) {
  return sliderImageDB.createSliderImage(eventId, sliderImage);
}

export async function getSliderImage(eventId: number, sliderImageId: number) {
  return sliderImageDB.getSliderImage(eventId, sliderImageId);
}

export async function updateSliderImage(eventId: number, sliderImageId: number, sliderImage: SliderImage) {
  return sliderImageDB.updateSliderImage(eventId, sliderImageId, sliderImage);
}

export async function deleteSliderImage(eventId: number, sliderImageId: number) {
  return sliderImageDB.deleteSliderImage(eventId, sliderImageId);
}
