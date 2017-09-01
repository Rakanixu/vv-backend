import { PollEntryAnswerDB } from './poll-entry-answer.db';
import { PollEntryAnswer } from './poll-entry-answer.model';

const pollEntryAnswerDB = new PollEntryAnswerDB();

export async function getPollEntryAnswers(pollEntryId: number) {
  return pollEntryAnswerDB.getPollEntryAnswers(pollEntryId);
}

export async function createPollEntryAnswer(pollEntryId: number, pollEntryAnswer: PollEntryAnswer) {
  return pollEntryAnswerDB.createPollEntryAnswer(pollEntryId, pollEntryAnswer);
}

export async function getPollEntryAnswer(pollEntryId: number, pollEntryAnswerId: number) {
  return pollEntryAnswerDB.getPollEntryAnswer(pollEntryId, pollEntryAnswerId);
}

export async function updatePollEntryAnswer(pollEntryId: number, pollEntryAnswerId: number, pollEntryAnswer: PollEntryAnswer) {
  return pollEntryAnswerDB.updatePollEntryAnswer(pollEntryId, pollEntryAnswerId, pollEntryAnswer);
}

export async function deletePollEntryAnswer(pollEntryId: number, pollEntryAnswerId: number) {
  return pollEntryAnswerDB.deletePollEntryAnswer(pollEntryId, pollEntryAnswerId);
}
