import { UserAccountDB } from './user-account.db';
import { UserAccount } from './user-account.model';
import { hash } from '../../utils/auth';

const userAccountDB = new UserAccountDB();

export async function getUsers(principalId: number) {
  return userAccountDB.getUsers(principalId);
}

export async function createUser(userId: number, userAccount: UserAccount) {
  userAccount.password = hash(userAccount.password);

  return userAccountDB.createUser(userId, userAccount);
}

export async function getUser(principalId: number, userId: number) {
  return userAccountDB.getUser(principalId, userId);
}

export async function updateUser(principalId: number, userId: number, userAccount: UserAccount) {
  userAccount.password = hash(userAccount.password);

  return userAccountDB.updateUser(principalId, userId, userAccount);
}

export async function deleteUser(principalId: number, userId: number) {
  return userAccountDB.deleteUser(principalId, userId);
}
