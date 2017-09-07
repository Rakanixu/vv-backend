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

async function getEventLocations(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventLocationController.getEventLocations(principalId));
}

async function createEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventLocationController.createEventLocation(principalId, req.body));
}

async function getEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventLocationController.getEventLocation(principalId, req.params.eventLocationId));
}

async function updateEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventLocationController.updateEventLocation(principalId, req.params.eventLocationId, req.body));
}

async function deleteEventLocation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, EventLocationController.deleteEventLocation(principalId, req.params.eventLocationId));
}
