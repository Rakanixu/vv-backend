import { QuestionTopicDB } from './question-topic.db';
import { QuestionTopic } from './question-topic.model';

const questionTopicDB = new QuestionTopicDB();

export async function getQuestionTopics(eventId: number) {
  return questionTopicDB.getQuestionTopics(eventId);
}

export async function createQuestionTopic(eventId: number, questionTopic: QuestionTopic) {
  return questionTopicDB.createQuestionTopic(eventId, questionTopic);
}

export async function getQuestionTopic(eventId: number, questionTopicId: number) {
  return questionTopicDB.getQuestionTopic(eventId, questionTopicId);
}

export async function updateQuestionTopic(eventId: number, questionTopicId: number, questionTopic: QuestionTopic) {
  return questionTopicDB.updateQuestionTopic(eventId, questionTopicId, questionTopic);
}

export async function deleteQuestionTopic(eventId: number, questionTopicId: number) {
  return questionTopicDB.deleteQuestionTopic(eventId, questionTopicId);
}
