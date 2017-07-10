import * as express from 'express';
import * as ParticipantController from './participant.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getParticipants);
routes.post('/', createParticipant);
routes.get('/:participantId', getParticipant);
routes.put('/:participantId', updateParticipant);
routes.delete('/:participantId', deleteParticipant);

function getParticipants(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.getParticipants(req.params.eventId));
}

function createParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.createParticipant(req.params.eventId, req.body));
}

function getParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.getParticipant(req.params.eventId, req.params.participantId));
}

function updateParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.updateParticipant(req.params.eventId, req.params.participantId, req.body));
}

function deleteParticipant(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ParticipantController.deleteParticipant(req.params.eventId, req.params.participantId));
}
