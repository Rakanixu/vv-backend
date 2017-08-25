import { UserAccountDB } from './user-account.db';
import { UserAccount } from './user-account.model';
import { hash, generateRandomString } from '../../utils/auth';
import { sendEmailWithTemplate } from '../../mail';
import { config } from '../../config';

const userAccountDB = new UserAccountDB();

export async function getUsers(principalId: number) {
  return userAccountDB.getUsers(principalId);
}

export async function createUser(userId: number, userAccount: UserAccount) {
  userAccount.password = hash(userAccount.password);
  userAccount.activation_token = generateRandomString(64);

  const existingUser: UserAccount[] = await userAccountDB.getUserByEmail(userAccount.email);
  if (existingUser.length) {
     throw new Error('User already exists');
  }

  const user: UserAccount = await userAccountDB.createUser(userId, userAccount);
  if (user) {
    const vars: any = {
      userId: user[0].id,
      activationToken: userAccount.activation_token
    };
    console.log(`User account created. Sending an email to ${userAccount.email}`);
    sendEmailWithTemplate(config.sparkpost.templates.userActivation, vars, [userAccount.email]).catch((reason: any) => {
      console.error('There was an error sending the activation email: ' + reason);
    });
  }

  return user;
}

export async function getUser(principalId: number, userId: number) {
  return userAccountDB.getUser(principalId, userId);
}

export async function updateUser(principalId: number, userId: number, userAccount: UserAccount) {
  if (userAccount.password) {
    userAccount.password = hash(userAccount.password);
  }

  return userAccountDB.updateUser(principalId, userId, userAccount);
}

export async function deleteUser(principalId: number, userId: number) {
  return userAccountDB.deleteUser(principalId, userId);
}
