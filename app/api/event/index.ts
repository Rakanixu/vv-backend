import * as express from 'express';
import * as EventController from './event.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router();

routes.get('/', getEvents);
routes.post('/', createEvent);
routes.get('/:eventId', getEvent);
routes.put('/:eventId', updateEvent);
routes.delete('/:eventId', deleteEvent);

function getEvents(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getEvents());
}

function createEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.createEvent(req.body));
}

function getEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.getEvent(req.params.eventId));
}

function updateEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.updateEvent(req.params.eventId, req.body));
}

function deleteEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventController.deleteEvent(req.params.eventId));
}

