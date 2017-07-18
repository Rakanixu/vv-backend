import * as express from 'express';
import * as multer from 'multer';
import * as MediaController from './media.controller';
import { resolve } from '../../utils/resolveRequest';
import { ICustomRequest } from '../../utils/custom.types';
import { storage } from '../../utils/upload.helpers';
import { manageFiles } from '../../utils/upload.helpers';
import { config } from '../../config/index';

const uploader = multer({ storage: storage });
const images = [
  { name: 'url', maxCount: 1 }
];

export const routes = express.Router();
export const upload = uploader.fields(images);

routes.get('/', getMedias);
routes.post('/', createMedia);
routes.get('/:mediaId', getMedia);
routes.put('/:mediaId', updateMedia);
routes.delete('/:mediaId', deleteMedia);

function getMedias(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, MediaController.getMedias());
}

function createMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['url']);

  resolve(req, res, MediaController.createMedia(req.body));
}

function getMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, MediaController.getMedia(req.params.mediaId));
}

function updateMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['url']);

  resolve(req, res, MediaController.updateMedia(req.params.mediaId, req.body));
}

function deleteMedia(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, MediaController.deleteMedia(req.params.mediaId));
}
