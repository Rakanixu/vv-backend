import { QuizEntryAnswerDB } from './quiz-entry-answer.db';
import { QuizEntryAnswer } from './quiz-entry-answer.model';

const quizEntryAnswerDB = new QuizEntryAnswerDB();

export async function getQuizEntryAnswers(quizEntryId: number) {
  return quizEntryAnswerDB.getQuizEntryAnswers(quizEntryId);
}

export async function createQuizEntryAnswer(quizEntryId: number, quizEntryAnswer: QuizEntryAnswer) {
  return quizEntryAnswerDB.createQuizEntryAnswer(quizEntryId, quizEntryAnswer);
}

export async function getQuizEntryAnswer(quizEntryId: number, quizEntryAnswerId: number) {
  return quizEntryAnswerDB.getQuizEntryAnswer(quizEntryId, quizEntryAnswerId);
}

export async function updateQuizEntryAnswer(quizEntryId: number, quizEntryAnswerId: number, quizEntryAnswer: QuizEntryAnswer) {
  return quizEntryAnswerDB.updateQuizEntryAnswer(quizEntryId, quizEntryAnswerId, quizEntryAnswer);
}

export async function deleteQuizEntryAnswer(quizEntryId: number, quizEntryAnswerId: number) {
  return quizEntryAnswerDB.deleteQuizEntryAnswer(quizEntryId, quizEntryAnswerId);
}
