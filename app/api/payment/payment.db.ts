import * as Knex from 'knex';
import * as _ from 'lodash';
import { dbClient } from '../../database/index';
import { Payment } from './payment.model';

const PAYMENT = 'payment';
const COLUMNS = [
  'id',
  'payment_type_id',
  'user_account_id',
  'event_id',
  'amount',
  'token',
  'description'
];

const PAYMENT_JOIN_COLUMNS = _.clone(COLUMNS);
PAYMENT_JOIN_COLUMNS[0] = 'event.id';
PAYMENT_JOIN_COLUMNS.push('event.title');

export class PaymentDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getPayments() {
    return this.knex(PAYMENT).select(COLUMNS);
  }

  public async createPayment(payment: Payment) {
    return this.knex(PAYMENT).insert(payment).returning(COLUMNS);
  }

  public async getPayment(paymentId: number) {
    return this.knex(PAYMENT).select(COLUMNS).where('id', paymentId);
  }

  public async updatePayment(paymentId: number, payment: Payment) {
    return this.knex(PAYMENT).update(payment).where('id', paymentId).returning(COLUMNS);
  }

  public async deletePayment(paymentId: number) {
    return this.knex.delete().from(PAYMENT).where('id', paymentId);
  }

  public async getEventTitleByPaymentId(paymentId: number) {
    return this.knex(PAYMENT)
    .select('event.*')
    .innerJoin('event', 'payment.event_id', 'event.id')
    .where('payment.id', paymentId);
  }
}
