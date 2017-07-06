import * as express from 'express';
import * as UserAccountController from './user-account.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router();

routes.get('/', getUsers);
routes.post('/', createUser);
routes.get('/:userId', getUser);
routes.put('/:userId', updateUser);
routes.delete('/:userId', deleteUser);

function getUsers(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.getUsers());
}

function createUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.createUser(req.params.userId, req.body));
}

function getUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.getUser(req.params.userId));
}

function updateUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.updateUser(req.params.userId, req.body));
}

function deleteUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.deleteUser(req.params.userId));
}
