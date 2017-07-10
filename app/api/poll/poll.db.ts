import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Poll } from './poll.model';

const POLL = 'poll';
const COLUMNS = [
  'id',
  'event_id',
  'name',
  'description'
];

export class PollDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getPolls(eventId: number) {
    return this.knex(POLL).select(COLUMNS).where('event_id', eventId);
  }

  public async createPoll(eventId: number, poll: Poll) {
    poll.event_id = eventId;
    return this.knex(POLL).insert(poll).returning(COLUMNS);
  }

  public async getPoll(eventId: number, pollId: number) {
    return this.knex(POLL).select(COLUMNS).where('event_id', eventId).where('id', pollId);
  }

  public async updatePoll(eventId: number, pollId: number, Poll: Poll) {
    return this.knex(POLL).update(Poll).where('event_id', eventId).where('id', pollId).returning(COLUMNS);
  }

  public async deletePoll(eventId: number, pollId: number) {
    return this.knex.delete().from(POLL).where('event_id', eventId).where('id', pollId);
  }
}
