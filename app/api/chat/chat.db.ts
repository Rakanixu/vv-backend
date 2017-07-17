import { ChatMessage } from './chat.model';
import { ChatDB } from '../../chat/chat.db';
import { Collections } from '../../chat/chat.model';

interface SearchByEventId {
  event_id: number;
}

interface SortByTimestamp {
  insert_timestamp: number;
}

export class ChatMessageDB extends ChatDB {
  public async getChatMessagesFromEvent(eventId: number) {
    const searchByEventId: SearchByEventId = {
      event_id: eventId
    };
    const sortDescTimestamp: SortByTimestamp = {
      insert_timestamp: -1 // descendat sorting
    };

    return this.searchDocuments(searchByEventId, sortDescTimestamp, Collections.broadcastMessage);
  }
}
