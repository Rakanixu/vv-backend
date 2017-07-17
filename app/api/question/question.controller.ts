import { QuestionDB } from './question.db';
import { Question } from './question.model';

const questionDB = new QuestionDB();

export async function getQuestions(questionTopicId: number) {
  return questionDB.getQuestions(questionTopicId);
}

export async function createQuestion(questionTopicId: number, question: Question) {
  return questionDB.createQuestion(questionTopicId, question);
}

export async function getQuestion(questionTopicId: number, questionId: number) {
  return questionDB.getQuestion(questionTopicId, questionId);
}

export async function updateQuestion(questionTopicId: number, questionId: number, question: Question) {
  return questionDB.updateQuestion(questionTopicId, questionId, question);
}

export async function deleteQuestion(questionTopicId: number, questionId: number) {
  return questionDB.deleteQuestion(questionTopicId, questionId);
}
