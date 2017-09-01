import * as express from 'express';
import * as multer from 'multer';
import * as QuizEntryAnswerController from './quiz-entry-answer.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { config } from '../../config/index';
import { isAuth } from '../../auth';

export const routes = express.Router({ mergeParams: true });

routes.get('/', isAuth, getQuizEntryAnswers);
routes.post('/', isAuth, createQuizEntryAnswer);
routes.get('/:quizEntryAnswerId', isAuth, getQuizEntryAnswer);
routes.put('/:quizEntryAnswerId', isAuth, updateQuizEntryAnswer);
routes.delete('/:quizEntryAnswerId', isAuth, deleteQuizEntryAnswer);

function getQuizEntryAnswers(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryAnswerController.getQuizEntryAnswers(req.params.quizEntryId));
}

function createQuizEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryAnswerController.createQuizEntryAnswer(req.params.quizEntryId, req.body));
}

function getQuizEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryAnswerController.getQuizEntryAnswer(req.params.quizEntryId, req.params.quizEntryAnswerId));
}

function updateQuizEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryAnswerController.updateQuizEntryAnswer(req.params.quizEntryId, req.params.quizEntryAnswerId, req.body));
}

function deleteQuizEntryAnswer(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizEntryAnswerController.deleteQuizEntryAnswer(req.params.quizEntryId, req.params.quizEntryAnswerId));
}
