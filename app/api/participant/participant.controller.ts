import { ParticipantDB } from './participant.db';
import { Participant } from './participant.model';

const participantDB = new ParticipantDB();

export async function getParticipants(eventId: number) {
  return participantDB.getParticipants(eventId);
}

export async function createParticipant(eventId: number, participant: Participant) {
  return participantDB.createParticipant(eventId, participant);
}

export async function getParticipant(eventId: number, participantId: number) {
  return participantDB.getParticipant(eventId, participantId);
}

export async function updateParticipant(eventId: number, participantId: number, participant: Participant) {
  return participantDB.updateParticipant(eventId, participantId, participant);
}

export async function deleteParticipant(eventId: number, participantId: number) {
  return participantDB.deleteParticipant(eventId, participantId);
}
