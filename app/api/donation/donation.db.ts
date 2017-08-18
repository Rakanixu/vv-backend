import * as Knex from 'knex';
import * as _ from 'lodash';
import { dbClient } from '../../database/index';
import { Donation } from './donation.model';

const DONATION = 'donation';
const COLUMNS = [
  'id',
  'payment_id',
  'principal_id',
  'firstname',
  'lastname',
  'street',
  'city',
  'state',
  'zip',
  'country',
  'phone',
  'email',
  'job_state',
  'employer',
  'occupation',
  'birthday',
  'recurring',
  'recurring_end',
  'source'
];

const PAYMENT_JOIN_COLUMNS = _.clone(COLUMNS);
PAYMENT_JOIN_COLUMNS[0] = DONATION + '.id';
PAYMENT_JOIN_COLUMNS.push('payment.amount');

export class DonationDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getDonations() {
    return this.knex(DONATION).select(COLUMNS);
  }

  public async createDonation(donation: Donation) {
    return this.knex(DONATION).insert(donation).returning(COLUMNS);
  }

  public async getDonation(donationId: number) {
    return this.knex(DONATION).select(COLUMNS).where('id', donationId);
  }

  public async getDonationsByPayment(paymentId: number) {
    return this.knex(DONATION).select(COLUMNS).where('payment_id', paymentId);
  }

  public async createDonationByPayment(paymentId: number, donation: Donation) {
    donation.payment_id = paymentId;
    return this.knex(DONATION).insert(donation).returning(COLUMNS);
  }

  public async getDonationByPayment(paymentId: number, donationId: number) {
    return this.knex(DONATION).select(COLUMNS).where('payment_id', paymentId).where('id', donationId);
  }

  public async getDonationsByPrincipal(principalId: number) {
    return this.knex(DONATION)
      .select(PAYMENT_JOIN_COLUMNS)
      .innerJoin('payment', DONATION + '.payment_id', 'payment.id')
      .where(DONATION + '.principal_id', principalId);
  }

  public async createDonationByPrincipal(principalId: number, donation: Donation) {
    donation.principal_id = principalId;
    return this.knex(DONATION).insert(donation).returning(COLUMNS);
  }

  public async getDonationByPrincipal(principalId: number, donationId: number) {
    return this.knex(DONATION)
      .select(PAYMENT_JOIN_COLUMNS)
      .innerJoin('payment', DONATION + '.payment_id', 'payment.id')
      .where(DONATION + '.principal_id', principalId)
      .where(DONATION + '.id', donationId);
  }
}
