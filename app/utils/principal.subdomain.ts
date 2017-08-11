import * as express from 'express';
import { PrincipalDB } from '../api/principal/principal.db';
import { Principal } from '../api/principal/principal.model';
import { ICustomRequest } from './custom.types';

const principalDB = new PrincipalDB();

export async function principalIdFromSubdomain(req: ICustomRequest, res: express.Response, next: express.NextFunction) {
  const principals: Principal[] = await principalDB.getPrincipalByDomain(req.hostname);

  if (principals.length === 1) {
    req.principalId = principals[0].id;
    console.log(req.hostname, req.principalId);
  } else {
    req.principalId = 0;
  }

  next();
}
