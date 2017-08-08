import * as express from 'express';
import * as QuestionTopicController from './question-topic.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';
import { isAuth } from '../../auth';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getQuestionTopics);
routes.post('/', isAuth, createQuestionTopic);
routes.get('/:questionTopicId', getQuestionTopic);
routes.put('/:questionTopicId', isAuth, updateQuestionTopic);
routes.delete('/:questionTopicId', isAuth, deleteQuestionTopic);

function getQuestionTopics(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionTopicController.getQuestionTopics(req.params.eventId));
}

function createQuestionTopic(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionTopicController.createQuestionTopic(req.params.eventId, req.body));
}

function getQuestionTopic(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionTopicController.getQuestionTopic(req.params.eventId, req.params.questionTopicId));
}

function updateQuestionTopic(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionTopicController.updateQuestionTopic(req.params.eventId, req.params.questionTopicId, req.body));
}

function deleteQuestionTopic(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, QuestionTopicController.deleteQuestionTopic(req.params.eventId, req.params.questionTopicId));
}

