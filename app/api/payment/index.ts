import * as express from 'express';
import * as PaymentController from './payment.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router();

routes.get('/', getPayments);
routes.post('/', createPayment);
routes.get('/:paymentId', getPayment);
routes.put('/:paymentId', updatePayment);
routes.delete('/:paymentId', deletePayment);

function getPayments(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PaymentController.getPayments());
}

function createPayment(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PaymentController.createPayment(req.body));
}

function getPayment(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PaymentController.getPayment(req.params.paymentId));
}

function updatePayment(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PaymentController.updatePayment(req.params.paymentId, req.body));
}

function deletePayment(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PaymentController.deletePayment(req.params.paymentId));
}

