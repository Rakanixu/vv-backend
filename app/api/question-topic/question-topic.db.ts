import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { QuestionTopic } from './question-topic.model';

const QUESTION_TOPIC = 'question_topic';
const COLUMNS = [
  'id',
  'event_id',
  'topic',
  'description'
];

export class QuestionTopicDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getQuestionTopics(eventId: number) {
    return this.knex(QUESTION_TOPIC).select(COLUMNS).where('event_id', eventId);
  }

  public async createQuestionTopic(eventId: number, questionTopic: QuestionTopic) {
    questionTopic.event_id = eventId;
    return this.knex(QUESTION_TOPIC).insert(questionTopic).returning(COLUMNS);
  }

  public async getQuestionTopic(eventId: number, questionTopicId: number) {
    return this.knex(QUESTION_TOPIC).select(COLUMNS).where('event_id', eventId).where('id', questionTopicId);
  }

  public async updateQuestionTopic(eventId: number, questionTopicId: number, questionTopic: QuestionTopic) {
    return this.knex(QUESTION_TOPIC).update(questionTopic).where('event_id', eventId).where('id', questionTopicId).returning(COLUMNS);
  }

  public async deleteQuestionTopic(eventId: number, questionTopicId: number) {
    return this.knex.delete().from(QUESTION_TOPIC).where('event_id', eventId).where('id', questionTopicId);
  }
}
