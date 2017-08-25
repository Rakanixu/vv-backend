import * as express from 'express';
import { ICustomRequest } from '../../utils/custom.types';
import { PaymentDB } from './payment.db';
import { Payment } from './payment.model';

const paymentDB = new PaymentDB();

export async function getPayments() {
  return paymentDB.getPayments();
}

export async function createPayment(payment: Payment) {
  return paymentDB.createPayment(payment);
}

export async function getPayment(paymentId: number) {
  return paymentDB.getPayment(paymentId);
}

export async function updatePayment(paymentId: number, payment: Payment) {
  return paymentDB.updatePayment(paymentId, payment);
}

export async function deletePayment(paymentId: number) {
  return paymentDB.deletePayment(paymentId);
}

export async function getEventTitleByPaymentId(paymentId: number) {
  return paymentDB.getEventTitleByPaymentId(paymentId);
}
