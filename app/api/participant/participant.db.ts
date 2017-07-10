import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Participant } from './participant.model';

const PARTICIPANT = 'participant';
const COLUMNS = [
  'id',
  'event_id',
  'name',
  'type',
  'avatar'
];

export class ParticipantDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getParticipants(eventId: number) {
    return this.knex(PARTICIPANT).select(COLUMNS).where('event_id', eventId);
  }

  public async createParticipant(eventId: number, participant: Participant) {
    participant.event_id = eventId;
    return this.knex(PARTICIPANT).insert(participant).returning(COLUMNS);
  }

  public async getParticipant(eventId: number, participantId: number) {
    return this.knex(PARTICIPANT).select(COLUMNS).where('event_id', eventId).where('id', participantId);
  }

  public async updateParticipant(eventId: number, participantId: number, Participant: Participant) {
    return this.knex(PARTICIPANT).update(Participant).where('event_id', eventId).where('id', participantId).returning(COLUMNS);
  }

  public async deleteParticipant(eventId: number, participantId: number) {
    return this.knex.delete().from(PARTICIPANT).where('event_id', eventId).where('id', participantId);
  }
}
