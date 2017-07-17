import * as express from 'express';
import * as PollEntryController from './poll-entry.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getPollEntries);
routes.post('/', createPollEntry);
routes.get('/:pollEntryId', getPollEntry);
routes.put('/:pollEntryId', updatePollEntry);
routes.delete('/:pollEntryId', deletePollEntry);

function getPollEntries(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.getPollEntries(req.params.pollId));
}

function createPollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.createPollEntry(req.params.pollId, req.body));
}

function getPollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.getPollEntry(req.params.pollId, req.params.pollEntryId));
}

function updatePollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.updatePollEntry(req.params.pollId, req.params.pollEntryId, req.body));
}

function deletePollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.deletePollEntry(req.params.pollId, req.params.pollEntryId));
}

