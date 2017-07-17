import { PollEntryDB } from './poll-entry.db';
import { PollEntry } from './poll-entry.model';

const pollEntryDB = new PollEntryDB();

export async function getPollEntries(pollId: number) {
  return pollEntryDB.getPollEntries(pollId);
}

export async function createPollEntry(pollId: number, pollEntry: PollEntry) {
  return pollEntryDB.createPollEntry(pollId, pollEntry);
}

export async function getPollEntry(pollId: number, pollEntryId: number) {
  return pollEntryDB.getPollEntry(pollId, pollEntryId);
}

export async function updatePollEntry(pollId: number, pollEntryId: number, pollEntry: PollEntry) {
  return pollEntryDB.updatePollEntry(pollId, pollEntryId, pollEntry);
}

export async function deletePollEntry(pollId: number, pollEntryId: number) {
  return pollEntryDB.deletePollEntry(pollId, pollEntryId);
}
