import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Bid } from './bid.model';

const BID = 'bid';
const COLUMNS = [
  'id',
  'user_account_id',
  'auction_id',
  'amount',
  'type'
];

export class BidDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getBids(auction_id: number) {
    return this.knex(BID).select(COLUMNS).where('auction_id', auction_id);
  }

  public async createBid(auctionId: number, bid: Bid) {
    bid.auction_id = auctionId;
    return this.knex(BID).insert(bid).returning(COLUMNS);
  }

  public async getBid(auctionId: number, bidId: number) {
    return this.knex(BID).select(COLUMNS).where('auction_id', auctionId).where('id', bidId);
  }

  public async updateBid(auctionId: number, bidId: number, bid: Bid) {
    return this.knex(BID).update(bid).where('auction_id', auctionId).where('id', bidId).returning(COLUMNS);
  }

  public async deleteBid(auctionId: number, bidId: number) {
    return this.knex.delete().from(BID).where('auction_id', auctionId).where('id', bidId);
  }
}
