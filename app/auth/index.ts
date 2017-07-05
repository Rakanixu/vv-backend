import * as express from 'express';
import * as passport from 'passport';
import { ICustomRequest } from '../utils/custom.types';
import { removePrefix } from '../utils/auth';
import { can } from './permissions';
import { Server } from '../server';
import * as localAuth from './local';

export function configure(srv: Server) {
    console.log('Auth module setup');
    srv.app.post('/login',  localAuth.login);
    srv.app.get('/secret', isAuth, function (req: ICustomRequest, res: express.Response) {
        res.json({ message: 'Success! You can not see this without a token'});
    });
    localAuth.configure();
    srv.app.use(passport.initialize());
}

export function isAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    localAuth.auth()(req, res, next);
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
