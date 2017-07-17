import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Admission } from './admission.model';

const ADMISSION = 'admission';
const COLUMNS = [
  'id',
  'event_id',
  'title',
  'subtitle',
  'price',
  'description',
  'icon'
];

export class AdmissionDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getAdmissions(eventId: number) {
    return this.knex(ADMISSION).select(COLUMNS).where('event_id', eventId);
  }

  public async createAdmission(eventId: number, admission: Admission) {
    admission.event_id = eventId;
    return this.knex(ADMISSION).insert(admission).returning(COLUMNS);
  }

  public async getAdmission(eventId: number, admissionId: number) {
    return this.knex(ADMISSION).select(COLUMNS).where('event_id', eventId).where('id', admissionId);
  }

  public async updateAdmission(eventId: number, admissionId: number, admission: Admission) {
    return this.knex(ADMISSION).update(admission).where('event_id', eventId).where('id', admissionId).returning(COLUMNS);
  }

  public async deleteAdmission(eventId: number, admissionId: number) {
    return this.knex.delete().from(ADMISSION).where('event_id', eventId).where('id', admissionId);
  }
}
