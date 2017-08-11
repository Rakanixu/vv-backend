import * as express from 'express';
import {ICustomRequest} from '../../utils/custom.types';

export function getHealth(req: ICustomRequest, res: express.Response, next: express.NextFunction): any {
    console.log('PrincipalID', req.principalId);
    res.json('OK');
}
