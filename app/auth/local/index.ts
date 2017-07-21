import * as express from 'express';
import * as passport from 'passport';
import { ICustomRequest } from '../../utils/custom.types';
import { UserAccount } from '../../api/user-account/user-account.model';
import { UserAccountDB } from '../../api/user-account/user-account.db';
import { hash } from '../../utils/auth';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import * as PassportJwt from 'passport-jwt';

const ExtractJwt = PassportJwt.ExtractJwt;
const JwtStrategy = PassportJwt.Strategy;
const uDB = new UserAccountDB();

function jwtCookieExtractor(req: ICustomRequest) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[config.sessionCookieName];
    }
    return token;
}

export function configure() {
    const extractors: PassportJwt.JwtFromRequestFunction[] = [ExtractJwt.fromAuthHeader()];
    // if a name for security token was provided, add an extractor for it
    if (config.sessionCookieName && config.sessionCookieName.length > 0) {
        extractors.push(jwtCookieExtractor);
    }
    const jwtOptions: PassportJwt.StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromExtractors(extractors),
        secretOrKey: config.sessionSecret
    };
    const strategy = new JwtStrategy(jwtOptions, (payload: any, done: PassportJwt.VerifiedCallback) => {
        let user: UserAccount;

        uDB.getUser(payload.id).then(function(data) {
            user = data[0];
            delete user.password;
            done(null, user);
        }).catch(function(err) {
            done(null, false);
        });
    });

    passport.use(strategy);
}

export function login(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
    if (!req.body.email || !req.body.password) {
        res.status(401).json({ message: 'email or password not provided: ' + JSON.stringify(req.body) });
        return;
    }

    uDB.getUserByEmail(req.body.email).then(function(data) {
        const user: UserAccount = data[0];

        if (!user) {
            res.status(401).json({ message: 'user not found' });
            return;
        }

        // check password
        const hashedPass = hash(req.body.password);
        console.log(hashedPass, user.password);
         if (hashedPass === user.password) {
            req.user = user;
            setTokenCookie(req, res);
        } else {
            res.status(401).json({ message: 'user or password incorrect' });
        }
    }).catch(function() {
        res.status(401).json({ message: 'user not found.' });
        return;
    });
}

/** Implements authentication. */
export function auth(): express.Handler {
    return passport.authenticate('jwt', { session: false });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id: string) {
    const payload = { id: id } as object;
    return jwt.sign(payload, config.sessionSecret, { expiresIn: config.sessionTokenDuration });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req: ICustomRequest, res: express.Response): void {
    if (!req.user) {
        res.status(404).json({ message: 'Something went wrong, please try again.' });
        return;
    }
    const token = signToken(`${req.user.id}`);
    if (config.sessionCookieName && config.sessionCookieName.length > 0) {
        res.cookie(config.sessionCookieName, token);
    }
    res.json({token: token});
}
