import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Auction } from './auction.model';

const AUCTION = 'auction';
const COLUMNS = [
  'id',
  'event_id',
  'name',
  'title',
  'opened_at',
  'closed_at',
  'description'
];


export class AuctionDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getAuctions(eventId: number) {
    return this.knex(AUCTION).select(COLUMNS).where('event_id', eventId);
  }

  public async createAuction(eventId: number, auction: Auction) {
    auction.event_id = eventId;
    return this.knex(AUCTION).insert(auction).returning(COLUMNS);
  }

  public async getAuction(eventId: number, auctionId: number) {
    return this.knex(AUCTION).select(COLUMNS).where('event_id', eventId).where('id', auctionId);
  }

  public async updateAuction(eventId: number, auctionId: number, auction: Auction) {
    return this.knex(AUCTION).update(auction).where('event_id', eventId).where('id', auctionId).returning(COLUMNS);
  }

  public async deleteAuction(eventId: number, auctionId: number) {
    return this.knex.delete().from(AUCTION).where('event_id', eventId).where('id', auctionId);
  }
}
