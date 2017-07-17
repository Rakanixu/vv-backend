import * as express from 'express';
import * as QuestionController from './question.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getQuestions);
routes.post('/', createQuestion);
routes.get('/:questionId', getQuestion);
routes.put('/:questionId', updateQuestion);
routes.delete('/:questionId', deleteQuestion);

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

