import * as express from 'express';
import * as RoleController from './role.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router();

routes.get('/', getRoles);
routes.post('/', createRole);
routes.get('/:roleId', getRole);
routes.put('/:roleId', updateRole);
routes.delete('/:roleId', deleteRole);

function getRoles(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, RoleController.getRoles());
}

function createRole(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, RoleController.createRole(req.body));
}

function getRole(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, RoleController.getRole(req.params.roleId));
}

function updateRole(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, RoleController.updateRole(req.params.roleId, req.body));
}

function deleteRole(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, RoleController.deleteRole(req.params.roleId));
}

