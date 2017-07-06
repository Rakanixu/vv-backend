export interface Payment {
  id?: number;
  user_id: number;
  amount: number;
  token: string;
  description: string;
}