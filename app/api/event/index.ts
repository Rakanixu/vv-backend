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

routes.get('/', getEvents);
routes.post('/', isAuth, createEvent);
routes.get('/:eventId', getEvent);
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
templateRoutes.post('/:eventId/copy', isAuth, copyEventFromTemplate);

async function getEvents(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.getEvents(principalId));
}

async function createEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.createEvent(principalId, req.body));
}

async function getEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.getEvent(principalId, req.params.eventId));
}

async function updateEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.updateEvent(principalId, req.params.eventId, req.body));
}

async function deleteEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.deleteEvent(principalId, req.params.eventId));
}

async function copyEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.copyEvent(principalId, req.params.eventId));
}

async function startEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.startEvent(principalId, req.params.eventId));
}

async function stopEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.stopEvent(principalId, req.params.eventId));
}

async function getEventToken(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.generateEventToken(principalId, req.params.eventId, req.query.token_duration, req.body));
}

async function getTemplates(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.getTemplates(principalId));
}

async function createTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.createTemplate(principalId, req.body));
}

async function getTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.getTemplate(principalId, req.params.eventId));
}

async function updateTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['preview_img', 'event_background', 'speaker_media']);
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.updateTemplate(principalId, req.params.eventId, req.body));
}

async function deleteTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.deleteTemplate(principalId, req.params.eventId));
}

async function copyEventFromTemplate(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventController.copyEventFromTemplate(principalId, req.params.eventId));
}
