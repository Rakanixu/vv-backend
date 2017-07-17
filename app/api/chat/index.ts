import * as express from 'express';
import * as ChatController from './chat.controller';
import { ICustomRequest } from '../../utils/custom.types';
import { resolve } from '../../utils/resolveRequest';

export const routes = express.Router({
  mergeParams: true
});

routes.get('/', getChatMessagesFromEvent);

function getChatMessagesFromEvent(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  resolve(req, res, ChatController.getChatMessagesFromEvent(parseInt(req.params.eventId, 10)));
}
