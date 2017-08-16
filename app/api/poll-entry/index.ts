import * as express from 'express';
import * as multer from 'multer';
import * as PollEntryController from './poll-entry.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { manageFiles } from '../../utils/upload.helpers';
import { storage } from '../../utils/upload.helpers';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

const uploader = multer({ storage: storage });
const images = [
  { name: 'icon', maxCount: 1 }
];

export const routes = express.Router({ mergeParams: true });
export const upload = uploader.fields(images);

routes.get('/', isAuth, getPollEntries);
routes.post('/', isAuth, createPollEntry);
routes.get('/:pollEntryId', isAuth, getPollEntry);
routes.put('/:pollEntryId', isAuth, updatePollEntry);
routes.delete('/:pollEntryId', isAuth, deletePollEntry);

function getPollEntries(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.getPollEntries(req.params.pollId));
}

function createPollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['icon']);

  resolve(req, res, PollEntryController.createPollEntry(req.params.pollId, req.body));
}

function getPollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.getPollEntry(req.params.pollId, req.params.pollEntryId));
}

function updatePollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  req.body = manageFiles(req, ['icon']);

  resolve(req, res, PollEntryController.updatePollEntry(req.params.pollId, req.params.pollEntryId, req.body));
}

function deletePollEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, PollEntryController.deletePollEntry(req.params.pollId, req.params.pollEntryId));
}

