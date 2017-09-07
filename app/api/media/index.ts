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

async function getMedias(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, MediaController.getMedias(principalId));
}

async function createMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['url']);
  const principalId = await getPrincipalId(req);
  resolve(req, res, MediaController.createMedia(principalId, req.body));
}

async function getMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, MediaController.getMedia(principalId, req.params.mediaId));
}

async function updateMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['url']);
  const principalId = await getPrincipalId(req);
  resolve(req, res, MediaController.updateMedia(principalId, req.params.mediaId, req.body));
}

async function deleteMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principalId = await getPrincipalId(req);
  resolve(req, res, MediaController.deleteMedia(principalId, req.params.mediaId));
}
