import * as express from 'express';
import * as HealthController from './health.controller';

export const routes = express.Router();

routes.get('/', HealthController.getHealth);
