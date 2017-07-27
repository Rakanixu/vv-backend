import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { QuizEntry } from './quiz-entry.model';

const QUIZ_ENTRY = 'quiz_entry';
const COLUMNS = [
  'id',
  'quiz_id',
  'question',
  'answer_one',
  'answer_two',
  'answer_three',
  'answer_four',
  'right_solution'
];

export class QuizEntryDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getQuizEntries(quizId: number) {
    return this.knex(QUIZ_ENTRY).select(COLUMNS).where('quiz_id', quizId);
  }

  public async createQuizEntry(quizId: number, quizEntry: QuizEntry) {
    quizEntry.quiz_id = quizId;
    return this.knex(QUIZ_ENTRY).insert(quizEntry).returning(COLUMNS);
  }

  public async getQuizEntry(quizId: number, quizEntryId: number) {
    return this.knex(QUIZ_ENTRY).select(COLUMNS).where('quiz_id', quizId).where('id', quizEntryId);
  }

  public async updateQuizEntry(quizId: number, quizEntryId: number, quizEntry: QuizEntry) {
    return this.knex(QUIZ_ENTRY).update(quizEntry).where('quiz_id', quizId).where('id', quizEntryId).returning(COLUMNS);
  }

  public async deleteQuizEntry(quizId: number, quizEntryId: number) {
    return this.knex.delete().from(QUIZ_ENTRY).where('quiz_id', quizId).where('id', quizEntryId);
  }
}
