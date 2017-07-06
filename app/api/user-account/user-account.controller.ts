import { UserAccountDB } from './user-account.db';
import { UserAccount } from './user-account.model';

const userAccountDB = new UserAccountDB();

export async function getUsers() {
  return userAccountDB.getUsers();
}

export async function createUser(userId: number, userAccount: UserAccount) {
  return userAccountDB.createUser(userId, userAccount);
}

export async function getUser(userId: number) {
  return userAccountDB.getUser(userId);
}

export async function updateUser(userId: number, userAccount: UserAccount) {
  return userAccountDB.updateUser(userId, userAccount);
}

export async function deleteUser(userId: number) {
  return userAccountDB.deleteUser(userId);
}
