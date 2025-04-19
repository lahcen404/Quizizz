import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Question } from '../shared/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  questions$ = this.questionsSubject.asObservable();

  private currentQuestionIndexSubject = new BehaviorSubject<number>(0);
  currentQuestionIndex$ = this.currentQuestionIndexSubject.asObservable();

  private scoreSubject = new BehaviorSubject<number>(0);
  score$ = this.scoreSubject.asObservable();

  constructor(private apiService: ApiService) {}

  startQuiz(categoryId: number, difficulty: string, numQuestions: number) {
    this.apiService.getQuestions(categoryId, difficulty, numQuestions).subscribe({
      next: (data) => {
        this.questionsSubject.next(data.results || []);
        this.currentQuestionIndexSubject.next(0);
        this.scoreSubject.next(0);
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      }
    });
  }

  getCurrentQuestion(): Question | null {
    const questions = this.questionsSubject.getValue();
    const index = this.currentQuestionIndexSubject.getValue();
    return questions[index] || null;
  }

  submitAnswer(answer: string, correctAnswer: string) {
    if (answer === correctAnswer) {
      this.scoreSubject.next(this.scoreSubject.getValue() + 1);
    }
    this.nextQuestion();
  }

  nextQuestion() {
    const nextIndex = this.currentQuestionIndexSubject.getValue() + 1;
    this.currentQuestionIndexSubject.next(nextIndex);
  }

  resetQuiz() {
    this.questionsSubject.next([]);
    this.currentQuestionIndexSubject.next(0);
    this.scoreSubject.next(0);
  }
}
