import { RoleDB } from './role.db';
import { Role } from './role.model';

const roleDB = new RoleDB();

export async function getRoles() {
  return roleDB.getRoles();
}

export async function createRole(role: Role) {
  return roleDB.createRole(role);
}

export async function getRole(roleId: number) {
  return roleDB.getRole(roleId);
}

export async function updateRole(roleId: number, role: Role) {
  return roleDB.updateRole(roleId, role);
}

export async function deleteRole(roleId: number) {
  return roleDB.deleteRole(roleId);
}
