import * as express from 'express';
import * as multer from 'multer';
import * as PrincipalController from './principal.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

const uploader = multer({ storage: storage });
const images = [
  { name: 'logo', maxCount: 1 },
  { name: 'background', maxCount: 1 },
  { name: 'default_image', maxCount: 1 }
];

export const routes = express.Router();
export const upload = uploader.fields(images);

routes.get('/', getPrincipals);
routes.post('/', createPrincipal);
routes.get('/:principalId', getPrincipal);
routes.put('/:principalId', isAuth, updatePrincipal);
routes.delete('/:principalId', isAuth, deletePrincipal);
routes.get('/:principalId/event', getEventsByPrincipal);
routes.get('/:principalId/user', isAuth, getUsersByPrincipal);
routes.get('/:principalId/role/:roleId/user', isAuth, getUsersByPrincipalAndRole);
routes.get('/:principalId/event_count', getEventsCountByPrincipal);
routes.get('/:principalId/user_count', isAuth, getUsersCountByPrincipal);

function getPrincipals(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getPrincipals());
}

function createPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['logo', 'background']);

  resolve(req, res, PrincipalController.createPrincipal(req.body));
}

function getPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getPrincipal(req.params.principalId));
}

function updatePrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['logo', 'background']);

  resolve(req, res, PrincipalController.updatePrincipal(req.params.principalId, req.body));
}

function deletePrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.deletePrincipal(req.params.principalId));
}

function getEventsByPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getEventsByPrincipal(req.params.principalId));
}

function getUsersByPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getUsersByPrincipal(req.params.principalId));
}

function getUsersByPrincipalAndRole(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getUsersByPrincipalAndRole(req.params.principalId, req.params.roleId));
}

function getEventsCountByPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getEventsCountByPrincipal(req.params.principalId));
}

function getUsersCountByPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getUsersCountByPrincipal(req.params.principalId));
}
