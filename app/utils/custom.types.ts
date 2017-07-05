import * as express from 'express';
import { UserAccount } from '../api/user-account/user-account.model';

export interface ICustomRequest extends express.Request {
    user: UserAccount;
}
