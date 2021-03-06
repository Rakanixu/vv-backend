import * as express from 'express';
import * as BidController from './bid.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { isAuth } from '../../auth';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', isAuth, getBids);
routes.post('/', isAuth, createBid);
routes.get('/:bidId', isAuth, getBid);
routes.put('/:bidId', isAuth, updateBid);
routes.delete('/:bidId', isAuth, deleteBid);

function getBids(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, BidController.getBids(req.params.auctionId));
}

function createBid(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, BidController.createBid(req.params.auctionId, req.body));
}

function getBid(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, BidController.getBid(req.params.auctionId, req.params.bidId));
}

function updateBid(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, BidController.updateBid(req.params.auctionId, req.params.bidId, req.body));
}

function deleteBid(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, BidController.deleteBid(req.params.auctionId, req.params.bidId));
}
