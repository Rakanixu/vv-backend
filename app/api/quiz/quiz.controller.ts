import { QuizDB } from './quiz.db';
import { Quiz } from './quiz.model';

const quizDB = new QuizDB();

export async function getQuizs(eventId: number) {
  return quizDB.getQuizs(eventId);
}

export async function createQuiz(eventId: number, quiz: Quiz) {
  return quizDB.createQuiz(eventId, quiz);
}

export async function getQuiz(eventId: number, quizId: number) {
  return quizDB.getQuiz(eventId, quizId);
}

export async function updateQuiz(eventId: number, quizId: number, quiz: Quiz) {
  return quizDB.updateQuiz(eventId, quizId, quiz);
}

export async function deleteQuiz(eventId: number, quizId: number) {
  return quizDB.deleteQuiz(eventId, quizId);
}
