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
  'username',
  'activation_token',
  'activation_date',
  'forget_password_token'
];

export class UserAccountDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getUsers(principalId: number) {
    return this.knex(USER_ACCOUNT).where('principal_id', principalId).select(COLUMNS);
  }

  public async getUsersByIds(userIds: number[]) {
    return this.knex(USER_ACCOUNT).whereIn('id', userIds).select(COLUMNS);
  }

  public async createUser(userId: number, userAccount: UserAccount) {
    return this.knex(USER_ACCOUNT).insert(userAccount).returning(COLUMNS);
  }

  public async getUser(principalId: number, userId: number) {
    if (principalId !== null) {
      return this.knex(USER_ACCOUNT).where('principal_id', principalId).where('id', userId).select(COLUMNS);
    } else {
      const users: UserAccount[] = await this.knex(USER_ACCOUNT).where('id', userId).select(COLUMNS);
      if (users && users.length > 0) {
        return users[0];
      }
    }
  }

  public async getUserByEmail(email: string) {
    return this.knex(USER_ACCOUNT).where('email', email).select(COLUMNS);
  }

  public async updateUser(principalId: number, userId: number, userAccount: UserAccount) {
    return this.knex(USER_ACCOUNT)
      .where('principal_id', principalId)
      .where('id', userId)
      .update(userAccount)
      .returning(COLUMNS);
  }

  public async updateUserById(userId: number, userAccount: UserAccount) {
    return this.knex(USER_ACCOUNT)
      .where('id', userId)
      .update(userAccount)
      .returning(COLUMNS);
  }

  public async deleteUser(principalId: number, userId: number) {
    return this.knex.delete().from(USER_ACCOUNT).where('principal_id', principalId).where('id', userId);
  }
}
