export interface Payment {
  id?: number;
  user_account_id: number;
  amount: number;
  token: string;
  description: string;
}
