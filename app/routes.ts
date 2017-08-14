import * as express from 'express';
import * as health from './api/health';
import * as eventLocation from './api/event-location';
import * as userAccount from './api/user-account';
import * as role from './api/role';
import * as media from './api/media';
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
import * as quizEntry from './api/quiz-entry';
import * as questionTopic from './api/question-topic';
import * as question from './api/question';
import * as poll from './api/poll';
import * as chat from './api/chat';
import * as pollEntry from './api/poll-entry';
import * as sliderImage from './api/slider-image';
import { config } from './config';
import { ICustomRequest } from './utils/custom.types';
import { principalIdFromSubdomain } from './utils/principal.subdomain';

const RESOURCES = {
    HEALTH: '/health',
    ROLE: '/role',
    MEDIA: '/media',
    EVENT_LOCATION: '/event_location',
    USER: '/user',
    PRINCIPAL: '/principal',
    DONATION_BY_PRINCIPAL: '/principal/:principalId/donation',
    PAYMENT: '/payment',
    DONATION_BY_PAYMENT: '/payment/:paymentId/donation',
    DONATION: '/donation',
    EVENT: '/event',
    PARTICIPANT: '/event/:eventId/participant',
    CHAT: '/event/:eventId/chat_message',
    AUCTION: '/event/:eventId/auction',
    BID: '/auction/:auctionId/bid',
    QUIZ: '/event/:eventId/quiz',
    POLL: '/event/:eventId/poll',
    POLL_ENTRY: '/poll/:pollId/poll_entry',
    ADMISSION: '/event/:eventId/admission',
    QUESTION_TOPIC: '/event/:eventId/question_topic',
    QUESTION: '/question_topic/:questionTopicId/question',
    QUIZ_ENTRY: '/quiz/:quizId/quiz_entry',
    SLIDER_IMAGE: '/event/:eventId/image',
    NAMED_GUEST: '/event/:eventId/named_guest'
};

export function setupRoutes(app: express.Express) {
    const router: express.Router = express.Router();

    router.use(RESOURCES.HEALTH, health.routes);
    router.use(RESOURCES.ROLE, role.routes);
    router.use(RESOURCES.MEDIA, media.upload, media.routes);
    router.use(RESOURCES.EVENT_LOCATION, eventLocation.routes);
    router.use(RESOURCES.USER, userAccount.upload, userAccount.routes);
    router.use(RESOURCES.PRINCIPAL, principal.upload, principal.routes);
    router.use(RESOURCES.ADMISSION, admission.upload, admission.routes);
    router.use(RESOURCES.SLIDER_IMAGE, sliderImage.upload, sliderImage.routes);
    router.use(RESOURCES.NAMED_GUEST, namedGuest.upload, namedGuest.routes);
    router.use(RESOURCES.PAYMENT, payment.routes);
    router.use(RESOURCES.DONATION_BY_PAYMENT, donation.routesByPayment);
    router.use(RESOURCES.DONATION_BY_PRINCIPAL, donation.routesByPrincipal);
    router.use(RESOURCES.DONATION, donation.routes);
    router.use(RESOURCES.PARTICIPANT, participant.upload, participant.routes);
    router.use(RESOURCES.CHAT, chat.routes);
    router.use(RESOURCES.EVENT, event.upload, event.routes);
    router.use(RESOURCES.AUCTION, auction.routes);
    router.use(RESOURCES.BID, bid.routes);
    router.use(RESOURCES.QUIZ, quiz.routes);
    router.use(RESOURCES.POLL, poll.routes);
    router.use(RESOURCES.POLL_ENTRY, pollEntry.upload, pollEntry.routes);
    router.use(RESOURCES.QUESTION_TOPIC, questionTopic.routes);
    router.use(RESOURCES.QUESTION, question.routes);
    router.use(RESOURCES.QUIZ_ENTRY, quizEntry.routes);

    app.use(config.apiPathPrefix, /* principalIdFromSubdomain, */ router);
    app.use('/', (req, res) => {
        res.statusCode = 404;
        res.send('Unknown url');
    });

    // error handling
    const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
        console.log(err, req.params, req.body);
        res.status(500).json({ error: err });
    };

    app.use(errorHandler);
}
