import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Quiz } from './quiz.model';

const QUIZ = 'quiz';
const COLUMNS = [
  'id',
  'event_id',
  'name',
  'description'
];

export class QuizDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getQuizs(eventId: number) {
    return this.knex(QUIZ).select(COLUMNS).where('event_id', eventId);
  }

  public async createQuiz(eventId: number, quiz: Quiz) {
    quiz.event_id = eventId;
    return this.knex(QUIZ).insert(quiz).returning(COLUMNS);
  }

  public async getQuiz(eventId: number, quizId: number) {
    return this.knex(QUIZ).select(COLUMNS).where('event_id', eventId).where('id', quizId);
  }

  public async updateQuiz(eventId: number, quizId: number, quiz: Quiz) {
    return this.knex(QUIZ).update(quiz).where('event_id', eventId).where('id', quizId).returning(COLUMNS);
  }

  public async deleteQuiz(eventId: number, quizId: number) {
    return this.knex.delete().from(QUIZ).where('event_id', eventId).where('id', quizId);
  }
}
