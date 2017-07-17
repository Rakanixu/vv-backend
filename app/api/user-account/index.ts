import * as express from 'express';
import * as multer from 'multer';
import * as UserAccountController from './user-account.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { config } from '../../config/index';

const uploader = multer({ storage: storage });
const images = [
  { name: 'avatar', maxCount: 1 }
];

export const routes = express.Router();
export const upload = uploader.fields(images);

routes.get('/', getUsers);
routes.post('/', createUser);
routes.get('/:userId', getUser);
routes.put('/:userId', updateUser);
routes.delete('/:userId', deleteUser);

function getUsers(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, UserAccountController.getUsers());
}

function createUser(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['avatar']);

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
