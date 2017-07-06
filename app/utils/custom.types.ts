import * as express from 'express';
import { UserAccount } from '../api/user-account/user-account.model';
<<<<<<< HEAD
import { EventLocation } from '../api/event-location/event-location.model';

export interface ICustomRequest extends express.Request {
    user: UserAccount;
    eventLocation: EventLocation;
=======
import { Principal } from '../api/principal/principal.model';

export interface ICustomRequest extends express.Request {
    user: UserAccount;
    principal: Principal;
>>>>>>> origin/dev
}
