import * as express from 'express';
import * as QuizController from './quiz.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getQuizs);
routes.post('/', createQuiz);
routes.get('/:quizId', getQuiz);
routes.put('/:quizId', updateQuiz);
routes.delete('/:quizId', deleteQuiz);

function getQuizs(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizController.getQuizs(req.params.eventId));
}

function createQuiz(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizController.createQuiz(req.params.eventId, req.body));
}

function getQuiz(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizController.getQuiz(req.params.eventId, req.params.quizId));
}

function updateQuiz(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizController.updateQuiz(req.params.eventId, req.params.quizId, req.body));
}

function deleteQuiz(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuizController.deleteQuiz(req.params.eventId, req.params.quizId));
}

