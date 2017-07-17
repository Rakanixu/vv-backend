import * as express from 'express';
import * as NamedGuestController from './named-guest.controller';
import { resolve } from '../../utils/resolveRequest';
import { ICustomRequest } from '../../utils/custom.types';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getNamedGuests);
routes.post('/', createNamedGuest);
routes.get('/:namedGuestId', getNamedGuest);
routes.put('/:namedGuestId', updateNamedGuest);
routes.delete('/:namedGuestId', deleteNamedGuest);

function getNamedGuests(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.getNamedGuests(req.params.eventId));
}

function createNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.createNamedGuests(req.params.eventId, req.body));
}

function getNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.getNamedGuest(req.params.eventId, req.params.namedGuestId));
}

function updateNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.updateNamedGuest(req.params.eventId, req.params.namedGuestId, req.body));
}

function deleteNamedGuest(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, NamedGuestController.deleteNamedGuest(req.params.eventId, req.params.namedGuestId));
}
