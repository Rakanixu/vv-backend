import * as express from 'express';
import * as AuctionController from './auction.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { isAuth } from '../../auth';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', isAuth, getAuctions);
routes.post('/', isAuth, createAuction);
routes.get('/:auctionId', isAuth, getAuction);
routes.put('/:auctionId', isAuth, updateAuction);
routes.delete('/:auctionId', isAuth, deleteAuction);

function getAuctions(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AuctionController.getAuctions(req.params.eventId));
}

function createAuction(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AuctionController.createAuction(req.params.eventId, req.body));
}

function getAuction(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AuctionController.getAuction(req.params.eventId, req.params.auctionId));
}

function updateAuction(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AuctionController.updateAuction(req.params.eventId, req.params.auctionId, req.body));
}

function deleteAuction(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AuctionController.deleteAuction(req.params.eventId, req.params.auctionId));
}

