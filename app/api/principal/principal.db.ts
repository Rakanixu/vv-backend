import * as Knex from 'knex';
import {dbClient} from '../../database/index';
import { Principal } from './principal.model';

const PRINCIPAL = 'principal';
const COLUMNS = [
  'id',
  'background',
  'domain',
  'subdomain',
  'design',
  'name',
  'description',
  'logo',
  'secondary_color',
  'primary_color',
  'design_notes',
  'tags',
  'created_at'
];

export class PrincipalDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getPrincipals() {
    return this.knex(PRINCIPAL).select(COLUMNS);
  }

  public async createPrincipal(principal: Principal) {
    return this.knex(PRINCIPAL).insert(principal).returning(COLUMNS);
  }

  public async getPrincipal(principalId: number) {
    return this.knex(PRINCIPAL).where('id', principalId).select(COLUMNS);
  }

  public async getPrincipalByDomain(domain: string) {
    return this.knex(PRINCIPAL).where('domain', domain).select(COLUMNS);
  }

  public async updatePrincipal(principalId: number, principal: Principal) {
    return this.knex(PRINCIPAL).where('id', principalId).update(principal).returning(COLUMNS);
  }

  public async deletePrincipal(principalId: number) {
    return this.knex.delete().from(PRINCIPAL).where('id', '=', principalId);
  }

  public async getEventsByPrincipal(principalId: number) {
    return this.knex('event').where('principal_id', '=', principalId).returning(COLUMNS);
  }

  public async getUsersByPrincipal(principalId: number) {
    return this.knex('user_account').where('principal_id', '=', principalId).returning(COLUMNS);
  }

  public async getEventsCountByPrincipal(principalId: number) {
    return this.knex('event').count().where('principal_id', '=', principalId);
  }

  public async getUsersCountByPrincipal(principalId: number) {
    return this.knex('user_account').count().where('principal_id', '=', principalId);
  }
}
