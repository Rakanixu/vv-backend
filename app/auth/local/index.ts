import * as express from 'express';
import * as passport from 'passport';
import { ICustomRequest } from '../../utils/custom.types';
import { UserAccount } from '../../api/user-account/user-account.model';
import { hash } from '../../utils/auth';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import * as PassportJwt from 'passport-jwt';

const ExtractJwt = PassportJwt.ExtractJwt;
const JwtStrategy = PassportJwt.Strategy;

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
        try {
            // to be done
            // get the user from db
            // user = await db.users.getUserById(payload.id);
            user = {
                id: 1,
                username: 'manager',
                email: 'manager@vvents.com'
            };

        } catch (err) {
            done(null, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

    passport.use(strategy);
}

export function login(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ message: 'user not provided: ' + JSON.stringify(req.body) });
        return;
    }
    let user: UserAccount;
    try {
        // to be done
        // get the user from db
        // user = await db.users.getUserByName(username, true);
        user = {
            id: 1,
            username: req.body.username,
            email: 'manager@vvents.com',
            password: hash(req.body.password)
        };

    } catch (err) {
        res.status(401).json({ message: 'user not found.' });
        return;
    }

    if (!user) {
        res.status(401).json({ message: 'user not found' });
        return;
    }

    // check password
    const hashedPass = hash(req.body.password);
    if (hashedPass === user.password) {
        console.log('User login succeeded!');
        req.user = user;
        setTokenCookie(req, res);
    } else {
        res.status(401).json({ message: 'user or password incorrect' });
    }
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
