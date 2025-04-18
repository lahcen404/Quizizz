import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Question } from '../shared/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;

  constructor(private apiService: ApiService) {}

  // Start a new quiz
  startQuiz(categoryId: number, difficulty: string, numQuestions: number) {
    this.apiService.getQuestions(categoryId, difficulty, numQuestions).subscribe({
      next: (data) => {
        this.questions = data.results; // Save the questions
        this.currentQuestionIndex = 0; // Start from the first question
        this.score = 0; // Reset the score
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      }
    });
  }

  // Get the current question
  getCurrentQuestion(): Question | null {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  // Submit the answer
  submitAnswer(answer: string, correctAnswer: string) {
    if (answer === correctAnswer) {
      this.score += 1; // Add 1 to the score
    }
    this.nextQuestion(); // Move to next question
  }

  // Go to next question
  nextQuestion() {
    this.currentQuestionIndex += 1;
  }

  // Reset the quiz
  resetQuiz() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
  }
}
