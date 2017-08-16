import * as express from 'express';
import * as QuestionController from './question.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { isAuth } from '../../auth';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', isAuth, getQuestions);
routes.post('/', isAuth, createQuestion);
routes.get('/:questionId', isAuth, getQuestion);
routes.put('/:questionId', isAuth, updateQuestion);
routes.delete('/:questionId', isAuth, deleteQuestion);

function getQuestions(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionController.getQuestions(req.params.questionTopicId));
}

function createQuestion(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionController.createQuestion(req.params.questionTopicId, req.body));
}

function getQuestion(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionController.getQuestion(req.params.questionTopicId, req.params.questionId));
}

function updateQuestion(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionController.updateQuestion(req.params.questionTopicId, req.params.questionId, req.body));
}

function deleteQuestion(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionController.deleteQuestion(req.params.questionTopicId, req.params.questionId));
}

