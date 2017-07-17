import * as express from 'express';
import * as SliderImageController from './slider-image.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getSliderImages);
routes.post('/', createSliderImage);
routes.get('/:sliderImageId', getSliderImage);
routes.put('/:sliderImageId', updateSliderImage);
routes.delete('/:sliderImageId', deleteSliderImage);

function getSliderImages(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.getSliderImages(req.params.eventId));
}

function createSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.createSliderImage(req.params.eventId, req.body));
}

function getSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.getSliderImage(req.params.eventId, req.params.sliderImageId));
}

function updateSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.updateSliderImage(req.params.eventId, req.params.sliderImageId, req.body));
}

function deleteSliderImage(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, SliderImageController.deleteSliderImage(req.params.eventId, req.params.sliderImageId));
}

