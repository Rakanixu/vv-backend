import * as express from 'express';
import * as EventLocationController from './event-location.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router();

routes.get('/', getEventLocations);
routes.post('/', createEventLocation);
routes.get('/:eventLocationId', getEventLocation);
routes.put('/:eventLocationId', updateEventLocation);
routes.delete('/:eventLocationId', deleteEventLocation);

function getEventLocations(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.getEventLocations(req.user.principal_id));
}

function createEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.createEventLocation(req.user.principal_id, req.body));
}

function getEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.getEventLocation(req.user.principal_id, req.params.eventLocationId));
}

function updateEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.updateEventLocation(req.user.principal_id, req.params.eventLocationId, req.body));
}

function deleteEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, EventLocationController.deleteEventLocation(req.user.principal_id, req.params.eventLocationId));
}
