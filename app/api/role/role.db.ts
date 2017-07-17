import * as Knex from 'knex';
import { dbClient } from '../../database/index';
import { Role } from './role.model';

const ROLE = 'role';
const COLUMNS = [
  'id',
  'name'
];


export class RoleDB {
  private knex: Knex;

  constructor() {
    this.knex = dbClient;
  }

  public async getRoles() {
    return this.knex(ROLE).select(COLUMNS);
  }

  public async createRole(role: Role) {
    return this.knex(ROLE).insert(role).returning(COLUMNS);
  }

  public async getRole(roleId: number) {
    return this.knex(ROLE).select(COLUMNS).where('id', roleId);
  }

  public async updateRole(roleId: number, role: Role) {
    return this.knex(ROLE).update(role).where('id', roleId).returning(COLUMNS);
  }

  public async deleteRole(roleId: number) {
    return this.knex.delete().from(ROLE).where('id', roleId);
  }
}
