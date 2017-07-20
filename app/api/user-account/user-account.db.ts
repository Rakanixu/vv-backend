import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { UserAccount } from './user-account.model';

const USER_ACCOUNT = 'user_account';
const COLUMNS = [
  'id',
  'principal_id',
  'role_id',
  'last_login_at',
  'salt',
  'last_logout_at',
  'timezone',
  'created_at',
  'language',
  'avatar',
  'deleted_at',
  'password',
  'updated_at',
  'last_activity_at',
  'email',
  'username'
];

export class UserAccountDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getUsers() {
    return this.knex(USER_ACCOUNT).select(COLUMNS);
  }

  public async createUser(userId: number, userAccount: UserAccount) {
    return this.knex(USER_ACCOUNT).insert(userAccount).returning(COLUMNS);
  }

  public async getUser(userId: number) {
    return this.knex(USER_ACCOUNT).where('id', userId).select(COLUMNS);
  }

  public async getUserByEmail(email: string) {
    return this.knex(USER_ACCOUNT).where('email', email).select(COLUMNS);
  }

  public async updateUser(userId: number, userAccount: UserAccount) {
    return this.knex(USER_ACCOUNT).where('id', userId).update(userAccount).returning(COLUMNS);
  }

  public async deleteUser(userId: number) {
    return this.knex.delete().from(USER_ACCOUNT).where('id', userId);
  }
}
