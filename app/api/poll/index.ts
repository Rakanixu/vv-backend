import * as express from 'express';
import * as PollController from './poll.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getPolls);
routes.post('/', createPoll);
routes.get('/:pollId', getPoll);
routes.put('/:pollId', updatePoll);
routes.delete('/:pollId', deletePoll);

function getPolls(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollController.getPolls(req.params.eventId));
}

function createPoll(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollController.createPoll(req.params.eventId, req.body));
}

function getPoll(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollController.getPoll(req.params.eventId, req.params.pollId));
}

function updatePoll(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollController.updatePoll(req.params.eventId, req.params.pollId, req.body));
}

function deletePoll(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollController.deletePoll(req.params.eventId, req.params.pollId));
}

