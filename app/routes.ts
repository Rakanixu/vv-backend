import * as express from 'express';
import * as health from './api/health';
import * as eventLocation from './api/event-location';
import * as userAccount from './api/user-account';
import * as role from './api/role';
import * as principal from './api/principal';
import * as payment from './api/payment';
import * as donation from './api/donation';
import * as event from './api/event';
import * as participant from './api/participant';
import * as namedGuest from './api/named-guest';
import * as admission from './api/admission';
import * as auction from './api/auction';
import * as bid from './api/bid';
import * as quiz from './api/quiz';
import * as questionTopic from './api/question-topic';
import * as poll from './api/poll';
import * as pollEntry from './api/poll-entry';
import * as sliderImage from './api/slider-image';
import { config } from './config';

export function setupRoutes(app: express.Express) {
    const router: express.Router = express.Router();

    router.use('/health', health.routes);
    router.use('/event_location', eventLocation.routes);
    router.use('/user', userAccount.routes);
    router.use('/role', role.routes);
    router.use('/principal', principal.routes);
    router.use('/payment', payment.routes);
    router.use('/event', event.routes);
    router.use('/event/:eventId/participant', participant.routes);
    router.use('/event/:eventId/named_guest', namedGuest.routes);
    router.use('/event/:eventId/admission', admission.routes);
    router.use('/event/:eventId/auction', auction.routes);
    router.use('/event/:eventId/quiz', quiz.routes);
    router.use('/event/:eventId/question_topic', questionTopic.routes);
    router.use('/event/:eventId/poll', poll.routes);
    router.use('/event/:eventId/image', sliderImage.routes);
    router.use('/payment', payment.routes);
    router.use('/auction/:auctionId/bid', bid.routes);
    router.use('/poll/:pollId/poll_entry', pollEntry.routes);
    router.use('/payment/:paymentId/donation', donation.routesByPayment);
    router.use('/donation', donation.routes);

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
