import * as express from 'express';
import * as passport from 'passport';
import { ICustomRequest } from '../utils/custom.types';
import { removePrefix } from '../utils/auth';
import { can } from './permissions';
import { Server } from '../server';
import { config } from '../config/index';
import { UserAccountDB } from '../api/user-account/user-account.db';
import { UserAccount } from '../api/user-account/user-account.model';
import * as localAuth from './local';

export function configure(srv: Server) {
    console.log('Auth module setup');
    srv.app.post('/login', localAuth.login);
    srv.app.options('/login', function(req: ICustomRequest, res: express.Response) {
        res.json();
    });
    srv.app.post('/activate', localAuth.activateUser);
    srv.app.get('/secret', isAuth, function (req: ICustomRequest, res: express.Response) {
        res.json({ message: 'Success! You can not see this without a token'});
    });
    localAuth.configure();
    srv.app.use(passport.initialize());
    // srv.app.use(passport.session());
}

export function isAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        localAuth.auth()(req, res, next);
    }
}

/** Main authorization middleware. */
export async function isAllowed(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
    const user = req.user;
    const url = removePrefix(req.originalUrl);

    if (!can(user, req, url)) {
        res.status(403).send('Forbidden');
        return;
    }
    next();
}

export function noAuth(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
    next();
}
