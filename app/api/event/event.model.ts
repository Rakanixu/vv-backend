export interface Event {
  id?: number;
  principal_id?: number;
  user_account_id?: number;
  event_type_id?: number;
  title: string;
  subtitle: string;
  speaker_media_type: number;
  speaker_media: string;
  notes: string;
  location: string;
  preview_img: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  event_background: string;
  login_required: boolean;
  latitude: number;
  longitude: number;
  date: string;
  chat_highlight: boolean;
  chat_with_user_image: boolean;
  pose_question: boolean;
  chat_shown_status_bar: boolean;
  stage_moment_webcam: boolean;
  chat_highlight_price: number;
  chat_with_user_image_price: number;
  pose_question_price: number;
  chat_shown_status_bar_price: number;
  stage_moment_webcam_price: number;
  tribecast_room_id: string;
  started_at: string;
  ended_at: string;
  is_template: boolean;
}

export interface EventTokenRequest {
  type: 'publisher' | 'subscriber';
}
