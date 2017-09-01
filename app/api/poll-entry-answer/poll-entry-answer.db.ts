import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { PollEntryAnswer } from './poll-entry-answer.model';

const POLL_ENTRY_ANSWER = 'poll_entry_answer';
const COLUMNS = [
  'id',
  'poll_entry_id',
  'user_account_id',
  'answer'
];

export class PollEntryAnswerDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getPollEntryAnswers(pollEntryId: number) {
    return this.knex(POLL_ENTRY_ANSWER).select(COLUMNS).where('poll_entry_id', pollEntryId);
  }

  public async createPollEntryAnswer(pollEntryId: number, pollEntryAnswer: PollEntryAnswer) {
    pollEntryAnswer.poll_entry_id = pollEntryId;
    return this.knex(POLL_ENTRY_ANSWER).insert(pollEntryAnswer).returning(COLUMNS);
  }

  public async getPollEntryAnswer(pollEntryId: number, pollEntryAnswerId: number) {
    return this.knex(POLL_ENTRY_ANSWER).select(COLUMNS).where('poll_entry_id', pollEntryId).where('id', pollEntryAnswerId);
  }

  public async updatePollEntryAnswer(pollEntryId: number, pollEntryAnswerId: number, pollEntryAnswer: PollEntryAnswer) {
    return this.knex(POLL_ENTRY_ANSWER)
      .update(pollEntryAnswer)
      .where('poll_entry_id', pollEntryId)
      .where('id', pollEntryAnswerId)
      .returning(COLUMNS);
  }

  public async deletePollEntryAnswer(pollEntryId: number, pollEntryAnswerId: number) {
    return this.knex.delete().from(POLL_ENTRY_ANSWER).where('poll_entry_id', pollEntryId).where('id', pollEntryAnswerId);
  }
}
