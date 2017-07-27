import { MediaDB } from './media.db';
import { Media } from './media.model';

const mediaDB = new MediaDB();

export async function getMedias(principalId: number) {
  return mediaDB.getMedias(principalId);
}

export async function createMedia(principalId: number, media: Media) {
  return mediaDB.createMedia(principalId, media);
}

export async function getMedia(principalId: number, mediaId: number) {
  return mediaDB.getMedia(principalId, mediaId);
}

export async function updateMedia(principalId: number, mediaId: number, media: Media) {
  return mediaDB.updateMedia(principalId, mediaId, media);
}

export async function deleteMedia(principalId: number, mediaId: number) {
  return mediaDB.deleteMedia(principalId, mediaId);
}
