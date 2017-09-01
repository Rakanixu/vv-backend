import * as express from 'express';
import * as multer from 'multer';
import * as PollEntryAnswerController from './poll-entry-answer.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

export const routes = express.Router({ mergeParams: true });

routes.get('/', isAuth, getPollEntryAnswers);
routes.post('/', isAuth, createPollEntryAnswer);
routes.get('/:pollEntryAnswerId', isAuth, getPollEntryAnswer);
routes.put('/:pollEntryAnswerId', isAuth, updatePollEntryAnswer);
routes.delete('/:pollEntryAnswerId', isAuth, deletePollEntryAnswer);

function getPollEntryAnswers(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryAnswerController.getPollEntryAnswers(req.params.pollEntryId));
}

function createPollEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryAnswerController.createPollEntryAnswer(req.params.pollEntryId, req.body));
}

function getPollEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryAnswerController.getPollEntryAnswer(req.params.pollEntryId, req.params.pollEntryAnswerId));
}

function updatePollEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryAnswerController.updatePollEntryAnswer(req.params.pollEntryId, req.params.pollEntryAnswerId, req.body));
}

function deletePollEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryAnswerController.deletePollEntryAnswer(req.params.pollEntryId, req.params.pollEntryAnswerId));
}

