import * as express from 'express';
import { ICustomRequest } from '../../utils/custom.types';
import { PrincipalDB } from './principal.db';
import { Principal } from './principal.model';

const principalDB = new PrincipalDB();

// read all principals
export async function getPrincipals() {
  return principalDB.getPrincipals();
}

// creates a principal
export async function createPrincipal(principal: Principal) {
  return principalDB.createPrincipal(principal);
}

// read a principal
export async function getPrincipal(principalId: number) {
  return principalDB.getPrincipal(principalId);
}

// update a principal
export async function updatePrincipal(principalId: number, principal: Principal) {
  return principalDB.updatePrincipal(principalId, principal);
}

// delete a principal
export async function deletePrincipal(principalId: number) {
  return principalDB.deletePrincipal(principalId);
}
