import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { Question } from '../shared/question.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private quizService = inject(QuizService);

  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  currentQuestion: Question | null = null;
  allAnswers: string[] = [];
  timedMode: boolean = false;
  timeLeft: number = 15;
  timer: any;
  category: string = '';
  difficulty: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const difficulty = params['difficulty'];
      const numQuestions = +params['numQuestions'] || 10;

      if (category && difficulty) {
        this.category = category;
        this.difficulty = difficulty;

        this.quizService.startQuiz(+category, difficulty, numQuestions);

        // Wait a moment then load the data
        setTimeout(() => {
          this.questions = this.quizService.questions;
          this.currentQuestionIndex = this.quizService.currentQuestionIndex;
          this.score = this.quizService.score;
          this.updateCurrentQuestion();
        }, 500); // Give time for the API to load
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  updateCurrentQuestion() {
    this.currentQuestion = this.quizService.getCurrentQuestion();
    if (this.currentQuestion) {
      this.allAnswers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ].sort(() => Math.random() - 0.5);

      if (this.timedMode) {
        this.timeLeft = 15;
        this.startTimer();
      }
    } else {
      // No more questions, go to results
      this.router.navigate(['/result'], {
        queryParams: {
          score: this.quizService.score,
          category: this.category,
          difficulty: this.difficulty,
          timed: this.timedMode,
          totalQuestions: this.questions.length
        }
      });
    }
  }

  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  submitAnswer(answer: string) {
    if (this.currentQuestion) {
      this.quizService.submitAnswer(answer, this.currentQuestion.correct_answer);
      if (this.timedMode && this.timer) {
        clearInterval(this.timer);
      }
      this.nextQuestion();
    }
  }

  nextQuestion() {
    this.quizService.nextQuestion();
    this.currentQuestionIndex = this.quizService.currentQuestionIndex;
    this.score = this.quizService.score;
    this.updateCurrentQuestion();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.quizService.resetQuiz();
  }
}
