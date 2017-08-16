import * as express from 'express';
import * as multer from 'multer';
import * as MediaController from './media.controller';
import { resolve } from '../../utils/resolveRequest';
import { ICustomRequest } from '../../utils/custom.types';
import { storage } from '../../utils/upload.helpers';
import { manageFiles } from '../../utils/upload.helpers';
import { getPrincipalId } from '../../utils/principal.subdomain';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

const uploader = multer({ storage: storage });
const images = [
  { name: 'url', maxCount: 1 }
];

export const routes = express.Router();
export const upload = uploader.fields(images);

routes.get('/', isAuth, getMedias);
routes.post('/', isAuth, createMedia);
routes.get('/:mediaId', isAuth, getMedia);
routes.put('/:mediaId', isAuth, updateMedia);
routes.delete('/:mediaId', isAuth, deleteMedia);

function getMedias(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, MediaController.getMedias(getPrincipalId(req)));
}

function createMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['url']);

  resolve(req, res, MediaController.createMedia(getPrincipalId(req), req.body));
}

function getMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, MediaController.getMedia(getPrincipalId(req), req.params.mediaId));
}

function updateMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['url']);

  resolve(req, res, MediaController.updateMedia(getPrincipalId(req), req.params.mediaId, req.body));
}

function deleteMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, MediaController.deleteMedia(getPrincipalId(req), req.params.mediaId));
}
