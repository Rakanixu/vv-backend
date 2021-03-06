import { DonationDB } from './donation.db';
import { Donation } from './donation.model';

const donationDB = new DonationDB();

export async function getDonations() {
  return donationDB.getDonations();
}

export async function createDonation(donation: Donation) {
  return donationDB.createDonation(donation);
}

export async function getDonation(donationId: number) {
  return donationDB.getDonation(donationId);
}

export async function getDonationsByPayment(paymentId: number) {
  return donationDB.getDonationsByPayment(paymentId);
}

export async function createDonationByPayment(paymentId: number, donation: Donation) {
  return donationDB.createDonationByPayment(paymentId, donation);
}

export async function getDonationByPayment(paymentId: number, donationId: number) {
  return donationDB.getDonationByPayment(paymentId, donationId);
}

export async function getDonationsByPrincipal(principalId: number) {
  return donationDB.getDonationsByPrincipal(principalId);
}

export async function createDonationByPrincipal(principalId: number, donation: Donation) {
  return donationDB.createDonationByPrincipal(principalId, donation);
}

export async function getDonationByPrincipal(principalId: number, donationId: number) {
  return donationDB.getDonationByPrincipal(principalId, donationId);
}
