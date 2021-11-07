import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service/data.service';
import { Question, Quiz } from '../types';

@Component({
  selector: 'page-quiz',
  template: `
    <div class="container" *ngIf="!!quiz">
      <h3>
        Question {{ currentQuestionIndex + 1 }}/{{ quiz.questions.length }}
      </h3>

      <ui-spacer [size]="80"></ui-spacer>

      <quiz-question
        *ngIf="!!currentQuestion"
        [question]="currentQuestion"
        [answer]="quiz.answers[currentQuestion.id]"
        [onAnswerChange]="onAnswerChange"
      ></quiz-question>

      <div class="footer">
        <ui-button
          [title]="'< Back'"
          [disabled]="!prevEnabled"
          (click)="prevEnabled ? onPrevClick() : undefined"
        ></ui-button>

        <ui-button
          [title]="'Next >'"
          [disabled]="!nextEnabled"
          (click)="nextEnabled ? onNextClick() : undefined"
        ></ui-button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        max-width: 640px;
        margin: 0 auto;
      }
      .footer {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
      }
    `,
  ],
})
export class QuizComponent implements OnInit {
  quiz?: Quiz;
  quizSubscription?: Subscription;
  currentQuestionIndex: number = 0;
  currentQuestion?: Question;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.quizSubscription = this.dataService.quizSubject.subscribe((quiz) => {
      this.quiz = quiz;

      if (!this.currentQuestion) {
        this.setCurrentQuestion(0);
      }
    });
  }

  onAnswerChange = (answer: string) => {
    if (!this.currentQuestion) {
      return;
    }

    this.dataService.setQuizAnswer({
      questionId: this.currentQuestion.id,
      answer,
    });
  };

  setCurrentQuestion(newIndex: number) {
    if (!this.quiz) {
      return;
    }

    this.currentQuestionIndex = newIndex;
    this.currentQuestion = this.quiz.questions.find(
      (_q, index) => index === newIndex
    );
  }

  onNextClick() {
    if (!this.quiz) {
      return;
    }

    if (this.currentQuestionIndex + 1 >= this.quiz.questions.length) {
      this.router.navigate(['/result']);
    } else {
      this.setCurrentQuestion(this.currentQuestionIndex + 1);
    }
  }

  onPrevClick() {
    this.setCurrentQuestion(this.currentQuestionIndex - 1);
  }

  get nextEnabled() {
    if (!this.quiz || !this.currentQuestion) {
      return false;
    }

    if (!this.quiz.answers[this.currentQuestion.id]) {
      return false;
    }

    return true;
  }

  get prevEnabled() {
    if (!this.quiz) {
      return false;
    }

    if (this.currentQuestionIndex - 1 < 0) {
      return false;
    }

    return true;
  }

  ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
  }
}
