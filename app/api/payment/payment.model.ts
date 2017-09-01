export interface Payment {
  id?: number;
  payment_type_id: number;
  user_account_id: number;
  event_id: number;
  amount: number;
  token: string;
  description: string;
}
