import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { PollEntry } from './poll-entry.model';

const POLL_ENTRY = 'poll_entry';
const COLUMNS = [
  'id',
  'poll_id',
  'title',
  'count',
  'description',
  'icon'
];

export class PollEntryDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getPollEntries(pollId: number) {
    return this.knex(POLL_ENTRY).select(COLUMNS).where('poll_id', pollId);
  }

  public async createPollEntry(pollId: number, pollEntry: PollEntry) {
    pollEntry.poll_id = pollId;
    return this.knex(POLL_ENTRY).insert(pollEntry).returning(COLUMNS);
  }

  public async getPollEntry(pollId: number, pollEntryId: number) {
    return this.knex(POLL_ENTRY).select(COLUMNS).where('poll_id', pollId).where('id', pollEntryId);
  }

  public async updatePollEntry(pollId: number, pollEntryId: number, pollEntry: PollEntry) {
    return this.knex(POLL_ENTRY).update(pollEntry).where('poll_id', pollId).where('id', pollEntryId).returning(COLUMNS);
  }

  public async deletePollEntry(pollId: number, pollEntryId: number) {
    return this.knex.delete().from(POLL_ENTRY).where('poll_id', pollId).where('id', pollEntryId);
  }
}
