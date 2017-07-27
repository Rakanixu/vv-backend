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
  chat_highlight: boolean;
  chat_with_user_image: boolean;
  pose_question: boolean;
  chat_shown_status_bar: boolean;
  stage_moment_webcam: boolean;
}
