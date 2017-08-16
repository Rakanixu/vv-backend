import * as express from 'express';
import * as EventLocationController from './event-location.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { getPrincipalId } from '../../utils/principal.subdomain';
import { resolve } from '../../utils/resolveRequest';
import { isAuth } from '../../auth';

export const routes = express.Router();

routes.get('/', isAuth, getEventLocations);
routes.post('/', isAuth, createEventLocation);
routes.get('/:eventLocationId', isAuth, getEventLocation);
routes.put('/:eventLocationId', isAuth, updateEventLocation);
routes.delete('/:eventLocationId', isAuth, deleteEventLocation);

function getEventLocations(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.getEventLocations(getPrincipalId(req)));
}

function createEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.createEventLocation(getPrincipalId(req), req.body));
}

function getEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.getEventLocation(getPrincipalId(req), req.params.eventLocationId));
}

function updateEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.updateEventLocation(getPrincipalId(req), req.params.eventLocationId, req.body));
}

function deleteEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.deleteEventLocation(getPrincipalId(req), req.params.eventLocationId));
}
