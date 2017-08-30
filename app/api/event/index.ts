import * as express from 'express';
import * as multer from 'multer';
import * as EventController from './event.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { getPrincipalId } from '../../utils/principal.subdomain';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

const uploader = multer({ storage: storage });
const images = [
  { name: 'preview_img', maxCount: 1 },
  { name: 'event_background', maxCount: 1 },
  { name: 'speaker_media', maxCount: 1 }
];

export const routes = express.Router();
export const templateRoutes = express.Router();
export const upload = uploader.fields(images);

routes.get('/', isAuth, getEvents);
routes.post('/', isAuth, createEvent);
routes.get('/:eventId', isAuth, getEvent);
routes.put('/:eventId', isAuth, updateEvent);
routes.delete('/:eventId', isAuth, deleteEvent);
routes.post('/:eventId/copy', isAuth, copyEvent);
routes.post('/:eventId/start', isAuth, startEvent);
routes.post('/:eventId/stop', isAuth, stopEvent);
routes.post('/:eventId/token', isAuth, getEventToken);

templateRoutes.get('', isAuth, getTemplates);
templateRoutes.post('/', isAuth, createTemplate);
templateRoutes.get('/:eventId', isAuth, getTemplate);
templateRoutes.put('/:eventId', isAuth, updateTemplate);
templateRoutes.delete('/:eventId', isAuth, deleteTemplate);

function getEvents(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getEvents(getPrincipalId(req)));
}

function createEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);

  resolve(req, res, EventController.createEvent(getPrincipalId(req), req.body));
}

function getEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getEvent(getPrincipalId(req), req.params.eventId));
}

function updateEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);

  resolve(req, res, EventController.updateEvent(getPrincipalId(req), req.params.eventId, req.body));
}

function deleteEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.deleteEvent(getPrincipalId(req), req.params.eventId));
}

function copyEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.copyEvent(getPrincipalId(req), req.params.eventId));
}

function startEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.startEvent(getPrincipalId(req), req.params.eventId));
}

function stopEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.stopEvent(getPrincipalId(req), req.params.eventId));
}

function getEventToken(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.generateEventToken(getPrincipalId(req), req.params.eventId, req.body));
}

function getTemplates(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getTemplates(getPrincipalId(req)));
}

function createTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);

  resolve(req, res, EventController.createTemplate(getPrincipalId(req), req.body));
}

function getTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getTemplate(getPrincipalId(req), req.params.eventId));
}

function updateTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);

  resolve(req, res, EventController.updateTemplate(getPrincipalId(req), req.params.eventId, req.body));
}

function deleteTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.deleteTemplate(getPrincipalId(req), req.params.eventId));
}
