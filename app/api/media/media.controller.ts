import { MediaDB } from './media.db';
import { Media } from './media.model';

const mediaDB = new MediaDB();

export async function getMedias() {
  return mediaDB.getMedias();
}

export async function createMedia(media: Media) {
  return mediaDB.createMedia(media);
}

export async function getMedia(mediaId: number) {
  return mediaDB.getMedia(mediaId);
}

export async function updateMedia(mediaId: number, media: Media) {
  return mediaDB.updateMedia(mediaId, media);
}

export async function deleteMedia(mediaId: number) {
  return mediaDB.deleteMedia(mediaId);
}
