import * as express from 'express';
import * as DonationController from './donation.controller';
import { resolve } from '../../utils/resolveRequest';
import { ICustomRequest } from '../../utils/custom.types';

export const routes = express.Router();
export const routesByPayment = express.Router({
  mergeParams: true
});

routes.get('/', getDonations);
routes.post('/', createDonation);
routes.get('/:donationId', getDonation);

routesByPayment.get('/', getDonationsByPayment);
routesByPayment.post('/', createDonationByPayment);
routesByPayment.get('/:donationId', getDonationByPayment);

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
