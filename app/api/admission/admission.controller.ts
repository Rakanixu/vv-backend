import { AdmissionDB } from './admission.db';
import { Admission } from './admission.model';

const admissionDB = new AdmissionDB();

export async function getAdmissions(eventId: number) {
  return admissionDB.getAdmissions(eventId);
}

export async function createAdmission(eventId: number, admission: Admission) {
  return admissionDB.createAdmission(eventId, admission);
}

export async function getAdmission(eventId: number, admissionId: number) {
  return admissionDB.getAdmission(eventId, admissionId);
}

export async function updateAdmission(eventId: number, admissionId: number, admission: Admission) {
  return admissionDB.updateAdmission(eventId, admissionId, admission);
}

export async function deleteAdmission(eventId: number, admissionId: number) {
  return admissionDB.deleteAdmission(eventId, admissionId);
}
