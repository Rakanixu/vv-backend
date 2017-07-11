import { BidDB } from './bid.db';
import { Bid } from './bid.model';

const bidDB = new BidDB();

export async function getBids(acutionId: number) {
  return bidDB.getBids(acutionId);
}

export async function createBid(acutionId: number, bid: Bid) {
  return bidDB.createBid(acutionId, bid);
}

export async function getBid(acutionId: number, bidId: number) {
  return bidDB.getBid(acutionId, bidId);
}

export async function updateBid(acutionId: number, bidId: number, bid: Bid) {
  return bidDB.updateBid(acutionId, bidId, bid);
}

export async function deleteBid(acutionId: number, bidId: number) {
  return bidDB.deleteBid(acutionId, bidId);
}
