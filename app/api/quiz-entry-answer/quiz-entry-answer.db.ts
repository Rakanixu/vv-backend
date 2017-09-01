import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { QuizEntryAnswer } from './quiz-entry-answer.model';

const QUIZ_ENTRY_ANSWER = 'quiz_entry_answer';
const COLUMNS = [
  'id',
  'quiz_entry_id',
  'user_account_id',
  'answer'
];

export class QuizEntryAnswerDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getQuizEntryAnswers(quizEntryId: number) {
    return this.knex(QUIZ_ENTRY_ANSWER).select(COLUMNS).where('quiz_entry_id', quizEntryId);
  }

  public async createQuizEntryAnswer(quizEntryId: number, quizEntryAnswer: QuizEntryAnswer) {
    quizEntryAnswer.quiz_entry_id = quizEntryId;
    return this.knex(QUIZ_ENTRY_ANSWER).insert(quizEntryAnswer).returning(COLUMNS);
  }

  public async getQuizEntryAnswer(quizEntryId: number, quizEntryAnswerId: number) {
    return this.knex(QUIZ_ENTRY_ANSWER).select(COLUMNS).where('quiz_entry_id', quizEntryId).where('id', quizEntryAnswerId);
  }

  public async updateQuizEntryAnswer(quizEntryId: number, quizEntryAnswerId: number, quizEntryAnswer: QuizEntryAnswer) {
    return this.knex(QUIZ_ENTRY_ANSWER)
      .update(quizEntryAnswer)
      .where('quiz_entry_id', quizEntryId)
      .where('id', quizEntryAnswerId)
      .returning(COLUMNS);
  }

  public async deleteQuizEntryAnswer(quizEntryId: number, quizEntryAnswerId: number) {
    return this.knex.delete().from(QUIZ_ENTRY_ANSWER).where('quiz_entry_id', quizEntryId).where('id', quizEntryAnswerId);
  }
}
