import * as express from 'express';
import * as passport from 'passport';
import { ICustomRequest } from '../../utils/custom.types';
import { UserAccount } from '../../api/user-account/user-account.model';
import { UserAccountDB } from '../../api/user-account/user-account.db';
import { hash, generateRandomString } from '../../utils/auth';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { sendEmailWithTemplate } from '../../mail';
import * as PassportJwt from 'passport-jwt';
import * as moment from 'moment';

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
        uDB.getUser(null, payload.id).then(function(user) {
            // user account must be activated!
            if (user.activation_date) {
                delete user.password;
                done(null, user);
            } else {
                console.log('Token generated for an user that is not activated. User: ' + user);
                done(null, false);
            }
        }).catch(function(err) {
            console.log('There was an error trying to access user logged in');
            done(null, false);
        });
    });

    passport.use(strategy);
}

export function login(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
    if (!req.body.email || !req.body.password) {
        console.log('Login error. Email or password not provided');
        res.status(401).json({ message: 'email or password not provided: ' + JSON.stringify(req.body) });
        return;
    }

    uDB.getUserByEmail(req.body.email).then(function(data) {
        const user: UserAccount = data[0];

        if (!user) {
            res.status(403).json({ message: 'user not found' });
            return;
        }
        // check password
        const hashedPass = hash(req.body.password);
         if (hashedPass === user.password) {
             if (user.activation_date) {
                req.user = user;
                setTokenCookie(req, res);
             } else {
                console.log('Login called for an user that is not activated');
                res.status(401).json({ message: 'account not activated' });
             }
        } else {
            console.log('Password was incorrect');
            res.status(403).json({ message: 'user or password incorrect' });
        }
    }).catch(function(err) {
        console.log('User not found');
        res.status(403).json({ message: 'user not found.' });
        return;
    });
}

export function activateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: number = req.body.userId;
    const activationToken: string = req.body.activationToken;
    if (!userId || !activationToken) {
        console.log('Activation - User to activate was not found');
        res.status(401).json({ message: 'user not found.' });
        return;
    }

    uDB.getUser(null, userId).then((user: UserAccount) => {
        if (user != null && user.activation_token === activationToken) {
            user.activation_date = moment().utc().format();
            user.activation_token = null;
            uDB.updateUserById(userId, user).then(() => {
                console.log(`User ${user.email} activated!`);
                res.json(user);
            }).catch((err) => {
                console.log(err);
                res.status(401).json({ message: 'user not found.' });
            });
        } else {
            console.log('Activation - Trying to activate an user that was not found');
            res.status(401).json({ message: 'user not found.' });
        }
    }).catch(function(err) {
        console.log('Activation - Error trying to get the user');
        res.status(401).json({ message: 'user not found.' });
        return;
    });
}

export function forgetPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const email: string = req.body.email;
    if (!email) {
        console.log('Forgot password - email not provided');
        res.status(401).json({ message: 'email not provided.' });
        return;
    }
    uDB.getUserByEmail(email).then((users: UserAccount[]) => {
        if (users.length) {
            const user: UserAccount = users[0];
            user.forget_password_token = generateRandomString(64);
            const vars: any = {
                userId: user.id,
                forgetPasswordToken: user.forget_password_token
            };

            sendEmailWithTemplate(config.sparkpost.templates.forgetPassword, vars, [user.email])
            .then(() => {
                uDB.updateUserById(user.id, user).then(() => {
                    res.json({ message: 'forget password mail sent' });
                }).catch((err) => {
                    console.log(err);
                    res.status(401).json({ message: 'user not found.' });
                });
            })
            .catch((reason: any) => {
                console.error('There was an error sending the forget password email: ' + reason);
                res.status(401).json({ message: 'user not found.' });
                return;
            });
        } else {
            console.log('Forget password - Trying to activate an user that was not found');
            res.status(401).json({ message: 'user not found.' });
            return;
        }
    }).catch(function(err) {
        console.log('Forget password - Error trying to get the user');
        res.status(401).json({ message: 'user not found.' });
        return;
    });
}

export function changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const forgetPasswordToken: string = req.body.forget_password_token;
    const userId: number = req.body.user_id;
    const password: string = req.body.password;
    const confirmPassword: string = req.body.confirm_password;

    if (!forgetPasswordToken || !userId || !password || !confirmPassword) {
        console.log('Couldnt change password. Data provided is not enough');
        res.status(401).json({ message: 'invalid data.' });
        return;
    }

    uDB.getUser(null, userId).then((user: UserAccount) => {
        if (user != null &&
            user.forget_password_token === forgetPasswordToken &&
            password === confirmPassword) {
            user.password = hash(password);
            user.forget_password_token = null;

            uDB.updateUserById(userId, user).then(() => {
                delete user.password;
                res.json(user);
            }).catch((err) => {
                console.log(err);
                res.status(401).json({ message: 'invalid data.' });
            });
        } else {
            console.log('changePassword - user not found');
            res.status(401).json({ message: 'invalid data.' });
        }
    }).catch(function(err) {
        console.log('changePassword - Error trying to get the user');
        res.status(401).json({ message: 'invalid data.' });
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
        console.log('Something was wrong setting user token');
        res.status(404).json({ message: 'Something went wrong, please try again.' });
        return;
    }
    const token = signToken(`${req.user.id}`);
    if (config.sessionCookieName && config.sessionCookieName.length > 0) {
        res.cookie(config.sessionCookieName, token);
    }
    res.json({token: token});
}
