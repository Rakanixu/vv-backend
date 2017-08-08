import * as express from 'express';
import * as multer from 'multer';
import * as NamedGuestController from './named-guest.controller';
import { resolve } from '../../utils/resolveRequest';
import { ICustomRequest } from '../../utils/custom.types';
import { storage } from '../../utils/upload.helpers';
import { manageFiles } from '../../utils/upload.helpers';
import { isAuth } from '../../auth';

const uploader = multer({ storage: storage });
const images = [
  { name: 'main_media', maxCount: 1 }
];

export const routes = express.Router({ mergeParams: true });
export const upload = uploader.fields(images);

routes.get('/', getNamedGuests);
routes.post('/', isAuth, createNamedGuest);
routes.get('/:namedGuestId', getNamedGuest);
routes.put('/:namedGuestId', isAuth, updateNamedGuest);
routes.delete('/:namedGuestId', isAuth, deleteNamedGuest);

function getNamedGuests(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.getNamedGuests(req.params.eventId));
}

function createNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['main_media']);

  resolve(req, res, NamedGuestController.createNamedGuests(req.params.eventId, req.body));
}

function getNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.getNamedGuest(req.params.eventId, req.params.namedGuestId));
}

function updateNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['main_media']);

  resolve(req, res, NamedGuestController.updateNamedGuest(req.params.eventId, req.params.namedGuestId, req.body));
}

function deleteNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.deleteNamedGuest(req.params.eventId, req.params.namedGuestId));
}
