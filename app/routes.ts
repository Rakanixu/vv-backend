import * as express from 'express';
import * as health from './api/health';
import * as eventLocation from './api/event-location';
import * as userAccount from './api/user-account';
import * as principal from './api/principal';
import * as event from './api/event';
import * as quiz from './api/quiz';
import { config } from './config';

export function setupRoutes(app: express.Express) {
    const router: express.Router = express.Router();
    router.use('/health', health.routes);
    router.use('/event_location', eventLocation.routes);
    router.use('/user', userAccount.routes);
    router.use('/principal', principal.routes);
    router.use('/event', event.routes);
    router.use('/event/:eventId/quiz', quiz.routes);

    app.use(config.apiPathPrefix, router);

    app.use('/', (req, res) => {
        res.statusCode = 404;
        res.send('Unknown url');
    });

    // error handling
    const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
        res.status(500).json({ error: err });
    };

    app.use(errorHandler);
}
