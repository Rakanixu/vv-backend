import { PollDB } from './poll.db';
import { Poll } from './poll.model';

const pollDB = new PollDB();

export async function getPolls(eventId: number) {
  return pollDB.getPolls(eventId);
}

export async function createPoll(eventId: number, poll: Poll) {
  return pollDB.createPoll(eventId, poll);
}

export async function getPoll(eventId: number, pollId: number) {
  return pollDB.getPoll(eventId, pollId);
}

export async function updatePoll(eventId: number, pollId: number, poll: Poll) {
  return pollDB.updatePoll(eventId, pollId, poll);
}

export async function deletePoll(eventId: number, pollId: number) {
  return pollDB.deletePoll(eventId, pollId);
}
