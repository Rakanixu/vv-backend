export interface ChatMessage {
  user_id: number;
  event_id: number;
  user_name: string;
  message: string;
  insert_timestamp: number;
}
