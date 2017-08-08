import * as express from 'express';
import * as multer from 'multer';
import * as UserAccountController from './user-account.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
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

function getUsers(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.getUsers(req.user.principal_id));
}

function createUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['avatar']);

  resolve(req, res, UserAccountController.createUser(req.params.userId, req.body));
}

function getMe(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  res.status(200).json(req.user);
}

function getUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.getUser(req.user.principal_id, req.params.userId));
}

function updateUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['avatar']);

  resolve(req, res, UserAccountController.updateUser(req.user.principal_id, req.params.userId, req.body));
}

function deleteUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.deleteUser(req.user.principal_id, req.params.userId));
}
