export interface QuizEntry {
  id?: number;
  quiz_id?: number;
  question: string;
  answer_one: string;
  answer_two: string;
  answer_three: string;
  answer_four: string;
  right_solution: number;
}
