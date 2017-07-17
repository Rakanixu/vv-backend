import { mongoClient } from '../database/index';
import { config } from '../config/index';

export class ChatDB {
  static url: string = config.mongoUrl;
  private conn: any = null;

  constructor() {
    this.openConn();
  }

  public insertDocument(document: any, collectionName: string) {
    document.insert_timestamp = new Date().getTime();
    this.conn.collection(collectionName).insertOne(document, (err: any, result: any) => {
      if (err) {
        console.error('Error inserting doc:', err);
      }
    });
  }

  public async searchDocuments(rule: any, sort: any, collectionName: string) {
    return new Promise((resolve, reject) => {
      this.conn.collection(collectionName).find(rule, { _id: 0 }).sort(sort).toArray((err: any, docs: any) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
    });
  }

  private openConn() {
    if (this.conn == null) {
      mongoClient.connect(ChatDB.url, (err: any, db: any) => {
        if (err) {
          console.error('ChatDB connectection error:', err);
        }
        console.log('Connected to MongoDB');
        this.conn = db;
      });
    }
  }

  private closeConn() {
    if (this.conn) {
      this.conn.close();
      this.conn = null;
    }
  }
}
