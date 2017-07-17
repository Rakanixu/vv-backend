export interface NamedGuest {
  id?: number;
  event_id?: number;
  main_media_type_id?: number;
  name: string;
  main_media: string;
  media_start_time: number;
  media_end_time: number;
  description: string;
  main_media_file: string;
}
