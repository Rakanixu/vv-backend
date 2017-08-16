import * as express from 'express';
import * as QuizEntryController from './quiz-entry.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { isAuth } from '../../auth';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', isAuth, getQuizEntries);
routes.post('/', isAuth, createQuizEntry);
routes.get('/:quizEntryId', isAuth, getQuizEntry);
routes.put('/:quizEntryId', isAuth, updateQuizEntry);
routes.delete('/:quizEntryId', isAuth, deleteQuizEntry);

function getQuizEntries(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryController.getQuizEntries(req.params.quizId));
}

function createQuizEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryController.createQuizEntry(req.params.quizId, req.body));
}

function getQuizEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryController.getQuizEntry(req.params.quizId, req.params.quizEntryId));
}

function updateQuizEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryController.updateQuizEntry(req.params.quizId, req.params.quizEntryId, req.body));
}

function deleteQuizEntry(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryController.deleteQuizEntry(req.params.quizId, req.params.quizEntryId));
}

