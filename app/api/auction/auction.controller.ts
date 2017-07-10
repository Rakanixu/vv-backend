import { AuctionDB } from './auction.db';
import { Auction } from './auction.model';

const auctionDB = new AuctionDB();

export async function getAuctions(eventId: number) {
  return auctionDB.getAuctions(eventId);
}

export async function createAuction(eventId: number, auction: Auction) {
  return auctionDB.createAuction(eventId, auction);
}

export async function getAuction(eventId: number, auctionId: number) {
  return auctionDB.getAuction(eventId, auctionId);
}

export async function updateAuction(eventId: number, auctionId: number, auction: Auction) {
  return auctionDB.updateAuction(eventId, auctionId, auction);
}

export async function deleteAuction(eventId: number, auctionId: number) {
  return auctionDB.deleteAuction(eventId, auctionId);
}
