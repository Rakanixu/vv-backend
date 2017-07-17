import { QuizEntryDB } from './quiz-entry.db';
import { QuizEntry } from './quiz-entry.model';

const quizEntryDB = new QuizEntryDB();

export async function getQuizEntries(quizId: number) {
  return quizEntryDB.getQuizEntries(quizId);
}

export async function createQuizEntry(quizId: number, quizEntry: QuizEntry) {
  return quizEntryDB.createQuizEntry(quizId, quizEntry);
}

export async function getQuizEntry(quizId: number, quizEntryId: number) {
  return quizEntryDB.getQuizEntry(quizId, quizEntryId);
}

export async function updateQuizEntry(quizId: number, quizEntryId: number, quizEntry: QuizEntry) {
  return quizEntryDB.updateQuizEntry(quizId, quizEntryId, quizEntry);
}

export async function deleteQuizEntry(quizId: number, quizEntryId: number) {
  return quizEntryDB.deleteQuizEntry(quizId, quizEntryId);
}
