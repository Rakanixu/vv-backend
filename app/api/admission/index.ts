import * as express from 'express';
import * as multer from 'multer';
import * as AdmissionController from './admission.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { config } from '../../config/index';

const uploader = multer({ storage: storage });
const images = [
  { name: 'icon', maxCount: 1 }
];

export const routes = express.Router({ mergeParams: true });
export const upload = uploader.fields(images);

routes.get('/', getAdmissions);
routes.post('/', createAdmission);
routes.get('/:admissionId', getAdmission);
routes.put('/:admissionId', updateAdmission);
routes.delete('/:admissionId', deleteAdmission);

function getAdmissions(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AdmissionController.getAdmissions(req.params.eventId));
}

function createAdmission(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['icon']);

  resolve(req, res, AdmissionController.createAdmission(req.params.eventId, req.body));
}

function getAdmission(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AdmissionController.getAdmission(req.params.eventId, req.params.admissionId));
}

function updateAdmission(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AdmissionController.updateAdmission(req.params.eventId, req.params.admissionId, req.body));
}

function deleteAdmission(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, AdmissionController.deleteAdmission(req.params.eventId, req.params.admissionId));
}

