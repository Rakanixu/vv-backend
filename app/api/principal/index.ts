import * as express from 'express';
import * as PrincipalController from './principal.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router();

routes.get('/', getPrincipals);
routes.post('/', createPrincipal);
routes.get('/:principalId', getPrincipal);
routes.put('/:principalId', updatePrincipal);
routes.delete('/:principalId', deletePrincipal);

function getPrincipals(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getPrincipals());
}

function createPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.createPrincipal(req.body));
}

function getPrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.getPrincipal(req.params.principalId));
}

function updatePrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.updatePrincipal(req.params.principalId, req.body));
}

function deletePrincipal(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PrincipalController.deletePrincipal(req.params.principalId));
}

