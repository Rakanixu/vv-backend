import * as express from 'express';
import { UserAccount } from '../api/user-account/user-account.model';
import { EventLocation } from '../api/event-location/event-location.model';
import { Principal } from '../api/principal/principal.model';

export interface ICustomRequest extends express.Request {
    user: UserAccount;
    principal: Principal;
    eventLocation: EventLocation;
    principalId: number;
}
