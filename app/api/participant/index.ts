import * as express from 'express';
import * as multer from 'multer';
import * as ParticipantController from './participant.controller';
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

export const routes = express.Router({ mergeParams: true });
export const upload = uploader.fields(images);

routes.get('/', isAuth, getParticipants);
routes.post('/', isAuth, createParticipant);
routes.get('/:participantId', isAuth, getParticipant);
routes.put('/:participantId', isAuth, updateParticipant);
routes.delete('/:participantId', isAuth, deleteParticipant);

function getParticipants(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.getParticipants(req.params.eventId));
}

function createParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['avatar']);

  resolve(req, res, ParticipantController.createParticipant(req.params.eventId, req.body));
}

function getParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.getParticipant(req.params.eventId, req.params.participantId));
}

function updateParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['avatar']);

  resolve(req, res, ParticipantController.updateParticipant(req.params.eventId, req.params.participantId, req.body));
}

function deleteParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.deleteParticipant(req.params.eventId, req.params.participantId));
}
