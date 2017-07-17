export interface Donation {
  id?: number;
  payment_id?: number;
  principal_id?: number;
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  job_state: string;
  employer: string;
  occupation: string;
  birthday: number;
  recurring: boolean;
  recurring_end: number;
  source: string;
}
