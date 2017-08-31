import { EB } from 'tribecast-integration-nodejs';
import { EventDB } from './event.db';
import { QuestionTopicDB } from '../question-topic/question-topic.db';
import { AdmissionDB } from '../admission/admission.db';
import { SliderImageDB } from '../slider-image/slider-image.db';
import { QuizDB } from '../quiz/quiz.db';
import { QuizEntryDB } from '../quiz-entry/quiz-entry.db';
import { PollDB } from '../poll/poll.db';
import { PollEntryDB } from '../poll-entry/poll-entry.db';
import { NamedGuestDB } from '../named-guest/named-guest.db';
import { Event, EventTokenRequest } from './event.model';
import { UserAccount } from '../user-account/user-account.model';
import { config } from '../../config';

const moment = require('moment');
const eventDB = new EventDB();
const questionTopicDB = new QuestionTopicDB();
const admissionDB = new AdmissionDB();
const sliderImage = new SliderImageDB();
const quizDB = new QuizDB();
const quizEntryDB = new QuizEntryDB();
const pollDB = new PollDB();
const pollEntryDB = new PollEntryDB();
const namedGuestDB = new NamedGuestDB();

export async function getEvents(principalId: number) {
  return eventDB.getEvents(principalId);
}

export async function createEvent(principalId: number, event: Event) {
  event.deleted_at = null;
  return eventDB.createEvent(principalId, event);
}

export async function getEvent(principalId: number, eventId: number) {
  return eventDB.getEvent(principalId, eventId);
}

export async function updateEvent(principalId: number, eventId: number, event: Event) {
  event.deleted_at = null;
  return eventDB.updateEvent(principalId, eventId, event);
}

export async function deleteEvent(principalId: number, eventId: number) {
  return eventDB.deleteEvent(principalId, eventId);
}

export async function copyEvent(principalId: number, eventId: number) {
  const eventList = await eventDB.getEvent(principalId, eventId);
  if (!eventList || !eventList.length) {
    return new Error('Event not found');
  }

  let event: Event = eventList[0];
  const originalEventId = event.id;
  delete event.id;
  event.created_at = moment().utc(new Date()).format();
  event = await eventDB.createEvent(principalId, event);
  const copiedEventId = event[0].id;

  await copy(
    originalEventId, copiedEventId, 'event_id',
    questionTopicDB.getQuestionTopics.bind(questionTopicDB), questionTopicDB.createQuestionTopic.bind(questionTopicDB)
  );
  await copy(
    originalEventId, copiedEventId, 'event_id',
    admissionDB.getAdmissions.bind(admissionDB), admissionDB.createAdmission.bind(admissionDB)
  );
  await copy(
    originalEventId, copiedEventId, 'event_id',
    sliderImage.getSliderImages.bind(sliderImage), sliderImage.createSliderImage.bind(sliderImage)
  );
  await copy(
    originalEventId, copiedEventId, 'event_id',
    namedGuestDB.getNamedGuests.bind(namedGuestDB), namedGuestDB.createNamedGuest.bind(namedGuestDB)
  );
  const quizIDs = await copy(
    originalEventId, copiedEventId, 'event_id',
    quizDB.getQuizs.bind(quizDB), quizDB.createQuiz.bind(quizDB)
  );
  for (let i = 0; i < (<MapOriginalCopyIds[]>quizIDs).length; i++) {
    await copy(
      quizIDs[i].originalId, quizIDs[i].copyId, 'quiz_id',
      quizEntryDB.getQuizEntries.bind(quizEntryDB), quizEntryDB.createQuizEntry.bind(quizEntryDB)
    );
  }
  const pollIDs = await copy(
    originalEventId, copiedEventId, 'event_id',
    pollDB.getPolls.bind(pollDB), pollDB.createPoll.bind(pollDB)
  );
  for (let i = 0; i < (<MapOriginalCopyIds[]>pollIDs).length; i++) {
    await copy(
      pollIDs[i].originalId, pollIDs[i].copyId, 'poll_id',
      pollEntryDB.getPollEntries.bind(pollEntryDB), pollEntryDB.createPollEntry.bind(pollEntryDB)
    );
  }

  return new Promise((resolve: any, reject: any) => {
    resolve(event);
  });
}

export async function startEvent(principalId: number, eventId: number) {
  if (!config.tribecast) {
    throw new Error('Session couldnt be started. Config not ready.');
  }

  const events: Event[] = await eventDB.getEvent(principalId, eventId);
  if (!events || events.length === 0) {
    throw new Error('Event not found');
  }
  const event: Event = events[0];

  const roomId: string = EB.generateRoomId(config.tribecast.apiKey,
    config.tribecast.useBroadcast, null, '320x200',
    EB.COMPOSITION_MODE_VERTICAL_LEFT, config.tribecast.secret);

  if (!roomId) {
    throw new Error('Session couldnt be started');
  }
  event.tribecast_room_id = roomId;
  event.started_at = (new Date()).toISOString();
  event.ended_at = null;

  return eventDB.updateEvent(principalId, eventId, event);
}

export async function stopEvent(principalId: number, eventId: number) {
  const events: Event[] = await eventDB.getEvent(principalId, eventId);
  if (!events || events.length === 0) {
    throw new Error('Event not found');
  }
  const event: Event = events[0];

  event.tribecast_room_id = '';
  event.ended_at = (new Date()).toISOString();

  return eventDB.updateEvent(principalId, eventId, event);
}

export async function generateEventToken(principalId: number, eventId: number, tokenReq: EventTokenRequest) {
  if (!config.tribecast) {
    throw new Error('Session couldnt be started. Config not ready.');
  }

  const events: Event[] = await eventDB.getEvent(principalId, eventId);
  if (!events || events.length === 0) {
    throw new Error('Event not found');
  }
  const event: Event = events[0];

  if (!event.tribecast_room_id) {
    throw new Error('Event is not started');
  }
  let type: string = 'subscriber';
  if (tokenReq && tokenReq.type) {
    type = tokenReq.type;
  }
  console.log('Generating token for user type ' + JSON.stringify(type));
  const token: string = EB.generateToken(event.tribecast_room_id, config.tribecast.apiKey,
    (new Date()).getTime() + config.tribecast.tokensDuration, type,
    config.tribecast.secret);

    return token;
}

export async function getTemplates(principalId: number) {
  return eventDB.getTemplates(principalId);
}

export async function createTemplate(principalId: number, event: Event) {
  event.date = null;
  event.deleted_at = null;
  return eventDB.createTemplate(principalId, event);
}

export async function getTemplate(principalId: number, eventId: number) {
  return eventDB.getTemplate(principalId, eventId);
}

export async function updateTemplate(principalId: number, eventId: number, event: Event) {
  event.date = null;
  event.deleted_at = null;
  return eventDB.updateTemplate(principalId, eventId, event);
}

export async function deleteTemplate(principalId: number, eventId: number) {
  return eventDB.deleteTemplate(principalId, eventId);
}

export async function copyEventFromTemplate(principalId: number, eventId: number) {
  const eventList = await eventDB.getTemplate(principalId, eventId);
  if (!eventList || !eventList.length) {
    return new Error('Event not found');
  }

  let event: Event = eventList[0];
  const originalEventId = event.id;
  delete event.id;
  event.created_at = moment().utc(new Date()).format();
  event.is_template = false;
  event = await eventDB.createEvent(principalId, event);
  const copiedEventId = event[0].id;

  await copy(
    originalEventId, copiedEventId, 'event_id',
    questionTopicDB.getQuestionTopics.bind(questionTopicDB), questionTopicDB.createQuestionTopic.bind(questionTopicDB)
  );
  await copy(
    originalEventId, copiedEventId, 'event_id',
    admissionDB.getAdmissions.bind(admissionDB), admissionDB.createAdmission.bind(admissionDB)
  );
  await copy(
    originalEventId, copiedEventId, 'event_id',
    sliderImage.getSliderImages.bind(sliderImage), sliderImage.createSliderImage.bind(sliderImage)
  );
  await copy(
    originalEventId, copiedEventId, 'event_id',
    namedGuestDB.getNamedGuests.bind(namedGuestDB), namedGuestDB.createNamedGuest.bind(namedGuestDB)
  );
  const quizIDs = await copy(
    originalEventId, copiedEventId, 'event_id',
    quizDB.getQuizs.bind(quizDB), quizDB.createQuiz.bind(quizDB)
  );
  for (let i = 0; i < (<MapOriginalCopyIds[]>quizIDs).length; i++) {
    await copy(
      quizIDs[i].originalId, quizIDs[i].copyId, 'quiz_id',
      quizEntryDB.getQuizEntries.bind(quizEntryDB), quizEntryDB.createQuizEntry.bind(quizEntryDB)
    );
  }
  const pollIDs = await copy(
    originalEventId, copiedEventId, 'event_id',
    pollDB.getPolls.bind(pollDB), pollDB.createPoll.bind(pollDB)
  );
  for (let i = 0; i < (<MapOriginalCopyIds[]>pollIDs).length; i++) {
    await copy(
      pollIDs[i].originalId, pollIDs[i].copyId, 'poll_id',
      pollEntryDB.getPollEntries.bind(pollEntryDB), pollEntryDB.createPollEntry.bind(pollEntryDB)
    );
  }

  return new Promise((resolve: any, reject: any) => {
    resolve(event);
  });
}

interface MapOriginalCopyIds {
  originalId: number;
  copyId: number;
}

async function copy(originalId: number, copyId: number, fk: string,  getcb: any, setcb: any) {
  const list = await getcb(originalId);
  const map: MapOriginalCopyIds[] = [];

  for (let i = 0; i < list.length; i++) {
    const el: MapOriginalCopyIds = {
      originalId: list[i].id,
      copyId: undefined
    };
    delete list[i].id;
    list[i][fk] = copyId;
    const newEl = await setcb(copyId, list[i]);
    el.copyId = newEl[0].id;

    map.push(el);
  }

  return new Promise((resolve, reject) => {
    resolve(map);
  });
}

