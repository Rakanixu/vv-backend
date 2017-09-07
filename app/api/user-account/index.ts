import * as express from 'express';
import * as multer from 'multer';
import * as UserAccountController from './user-account.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { getPrincipalId } from '../../utils/principal.subdomain';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

const uploader = multer({ storage: storage });
const images = [
  { name: 'avatar', maxCount: 1 }
];

export const routes = express.Router();
export const upload = uploader.fields(images);

routes.get('/', isAuth, getUsers);
routes.post('/', createUser);
routes.get('/me',  isAuth, getMe);
routes.get('/:userId',  isAuth, getUser);
routes.put('/:userId',  isAuth, updateUser);
routes.delete('/:userId',  isAuth, deleteUser);

async function getUsers(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, UserAccountController.getUsers(principalId));
}

function createUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['avatar']);

  resolve(req, res, UserAccountController.createUser(req.params.userId, req.body));
}

function getMe(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  res.status(200).json(req.user);
}

async function getUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, UserAccountController.getUser(principalId, req.params.userId));
}

async function updateUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['avatar']);
  const principalId = await getPrincipalId(req);
  resolve(req, res, UserAccountController.updateUser(principalId, req.params.userId, req.body));
}

async function deleteUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, UserAccountController.deleteUser(principalId, req.params.userId));
}
