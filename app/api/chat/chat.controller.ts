import { ChatMessageDB } from './chat.db';
import { ChatMessage } from './chat.model';

const chatMessageDB = new ChatMessageDB();

export async function getChatMessagesFromEvent(eventId: number) {
  return chatMessageDB.getChatMessagesFromEvent(eventId);
}
