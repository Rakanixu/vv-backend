export interface Event {
  id?: number;
  principal_id?: number;
  user_account_id?: number;
  event_type_id?: number;
  title: string;
  notes: string;
  location: string;
  preview_img: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  event_background: string;
  login_required: boolean;
  latitude: number;
  longitude: number;
  date: number;
}
