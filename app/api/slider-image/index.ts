import * as express from 'express';
import * as multer from 'multer';
import * as SliderImageController from './slider-image.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

const uploader = multer({ storage: storage });
const images = [
  { name: 'img', maxCount: 1 }
];

export const routes = express.Router({ mergeParams: true });
export const upload = uploader.fields(images);

routes.get('/', getSliderImages);
routes.post('/', isAuth, createSliderImage);
routes.get('/:sliderImageId', getSliderImage);
routes.put('/:sliderImageId', isAuth, updateSliderImage);
routes.delete('/:sliderImageId', isAuth, deleteSliderImage);

function getSliderImages(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.getSliderImages(req.params.eventId));
}

function createSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['img']);

  resolve(req, res, SliderImageController.createSliderImage(req.params.eventId, req.body));
}

function getSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.getSliderImage(req.params.eventId, req.params.sliderImageId));
}

function updateSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['img']);

  resolve(req, res, SliderImageController.updateSliderImage(req.params.eventId, req.params.sliderImageId, req.body));
}

function deleteSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.deleteSliderImage(req.params.eventId, req.params.sliderImageId));
}

