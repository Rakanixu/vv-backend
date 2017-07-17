import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Question } from './question.model';

const QUESTION = 'question';
const COLUMNS = [
  'id',
  'question_topic_id',
  'mesage'
];

export class QuestionDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getQuestions(questionTopicId: number) {
    return this.knex(QUESTION).select(COLUMNS).where('question_topic_id', questionTopicId);
  }

  public async createQuestion(questionTopicId: number, question: Question) {
    question.question_topic_id = questionTopicId;
    console.log(question);
    return this.knex(QUESTION).insert(question).returning(COLUMNS);
  }

  public async getQuestion(questionTopicId: number, questionId: number) {
    return this.knex(QUESTION).select(COLUMNS).where('question_topic_id', questionTopicId).where('id', questionId);
  }

  public async updateQuestion(questionTopicId: number, questionId: number, question: Question) {
    return this.knex(QUESTION).update(question).where('question_topic_id', questionTopicId).where('id', questionId).returning(COLUMNS);
  }

  public async deleteQuestion(questionTopicId: number, questionId: number) {
    return this.knex.delete().from(QUESTION).where('question_topic_id', questionTopicId).where('id', questionId);
  }
}
