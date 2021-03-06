import * as express from 'express';
import * as DonationController from './donation.controller';
import { resolve } from '../../utils/resolveRequest';
import { ICustomRequest } from '../../utils/custom.types';
import { isAuth } from '../../auth';

export const routes = express.Router();
export const routesByPayment = express.Router({ mergeParams: true });
export const routesByPrincipal = express.Router({ mergeParams: true });

routes.get('/', isAuth, getDonations);
routes.post('/', isAuth, createDonation);
routes.get('/:donationId', isAuth, getDonation);

routesByPayment.get('/', isAuth, getDonationsByPayment);
routesByPayment.post('/', isAuth, createDonationByPayment);
routesByPayment.get('/:donationId', isAuth, getDonationByPayment);

routesByPrincipal.get('/', isAuth, getDonationsByPrincipal);
routesByPrincipal.post('/', isAuth, createDonationByPrincipal);
routesByPrincipal.get('/:donationId', isAuth, getDonationByPrincipal);

function getDonations(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.getDonations());
}

function createDonation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.createDonation(req.body));
}

function getDonation(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.getDonation(req.params.donationId));
}

function getDonationsByPayment(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.getDonationsByPayment(req.params.paymentId));
}

function createDonationByPayment(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.createDonationByPayment(req.params.paymentId, req.body));
}

function getDonationByPayment(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.getDonationByPayment(req.params.paymentId, req.params.donationId));
}

function getDonationsByPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.getDonationsByPrincipal(req.params.principalId));
}

function createDonationByPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.createDonationByPrincipal(req.params.principalId, req.body));
}

function getDonationByPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, DonationController.getDonationByPrincipal(req.params.principalId, req.params.donationId));
}

