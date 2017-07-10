import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Payment } from './payment.model';

const PAYMENT = 'payment';
const COLUMNS = [
  'id',
  'user_account_id',
  'amount',
  'token',
  'description'
];

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
}
