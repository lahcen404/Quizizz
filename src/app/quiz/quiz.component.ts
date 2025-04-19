import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
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
  questionAnswered: boolean = false;
  category: string = '';
  difficulty: string = '';

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    this.timedMode = settings?.timedMode || false;

    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const difficulty = params['difficulty'];
      const numQuestions = +params['numQuestions'] || 10;

      if (category && difficulty) {
        this.category = category;
        this.difficulty = difficulty;
        this.quizService.startQuiz(+category, difficulty, numQuestions);
      } else {
        this.router.navigate(['/']);
      }
    });

    this.subscriptions.push(
      this.quizService.questions$.subscribe(qs => {
        this.questions = qs;
        this.updateCurrentQuestion();
      }),

      this.quizService.currentQuestionIndex$.subscribe(index => {
        this.currentQuestionIndex = index;
        this.updateCurrentQuestion();
      }),

      this.quizService.score$.subscribe(score => {
        this.score = score;
      })
    );
  }

  updateCurrentQuestion() {
    this.questionAnswered = false;
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
    } else if (this.questions.length > 0 && this.currentQuestionIndex >= this.questions.length) {
      this.router.navigate(['/result'], {
        queryParams: {
          score: this.score,
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
      if (this.timeLeft <= 0 && !this.questionAnswered) {
        this.questionAnswered = true;
        clearInterval(this.timer);
        this.quizService.nextQuestion();
      }
    }, 1000);
  }

  submitAnswer(answer: string) {
    if (this.currentQuestion && !this.questionAnswered) {
      this.questionAnswered = true;
      clearInterval(this.timer);
      this.quizService.submitAnswer(answer, this.currentQuestion.correct_answer);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    clearInterval(this.timer);
    this.quizService.resetQuiz();
  }
}
