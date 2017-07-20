import * as express from 'express';
import * as multer from 'multer';
import * as EventController from './event.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { config } from '../../config/index';

const uploader = multer({ storage: storage });
const images = [
  { name: 'preview_img', maxCount: 1 },
  { name: 'event_background', maxCount: 1 }
];

export const routes = express.Router();
export const upload = uploader.fields(images);

routes.get('/', getEvents);
routes.post('/', createEvent);
routes.get('/:eventId', getEvent);
routes.put('/:eventId', updateEvent);
routes.delete('/:eventId', deleteEvent);

function getEvents(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getEvents());
}

function createEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background']);

  resolve(req, res, EventController.createEvent(req.body));
}

function getEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getEvent(req.params.eventId));
}

function updateEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background']);

  resolve(req, res, EventController.updateEvent(req.params.eventId, req.body));
}

function deleteEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.deleteEvent(req.params.eventId));
}

