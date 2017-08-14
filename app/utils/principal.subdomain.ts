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
    req.principalId = -1;
  }

  next();
}

export function getPrincipalId(req: ICustomRequest): number {
  let principalId: number = req.principalId;

  if (!(principalId > 0)) {
    try {
      principalId = req.user.principal_id;
    } catch (err) {
      principalId = -1;
    }
  }

  return principalId;
}
