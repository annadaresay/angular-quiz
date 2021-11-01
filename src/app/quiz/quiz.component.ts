import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsService } from '../questions.service';
import { Question, Quiz } from '../types';

@Component({
  selector: 'page-quiz',
  template: `
    <div class="container">
      <h3>Question {{ currentQuestionIndex + 1 }}/{{ numberOfQuestions }}</h3>

      <ui-spacer [size]="80"></ui-spacer>

      <quiz-question
        *ngIf="!!currentQuestion"
        [question]="currentQuestion"
      ></quiz-question>

      <div class="footer">
        <ui-button
          [title]="'< Back'"
          [disabled]="!prevEnabled"
          (click)="prevEnabled ? prev() : undefined"
        ></ui-button>

        <ui-button
          [title]="'Next >'"
          [disabled]="!nextEnabled"
          (click)="nextEnabled ? next() : undefined"
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
  quiz: Observable<Quiz | undefined>;
  numberOfQuestions: number = 0;
  currentQuestionIndex: number = 0;
  currentQuestion: Question | undefined;

  constructor(private questionsService: QuestionsService) {
    this.questionsService.generateQuiz();
    this.quiz = this.questionsService.getQuiz();
  }

  ngOnInit(): void {
    this.quiz.subscribe((data) => {
      if (data) {
        this.numberOfQuestions = data?.questions.length;
        this.setCurrentQuestion(0, data);
      }
    });
  }

  private setCurrentQuestion(newIndex: number, data: Quiz) {
    this.currentQuestionIndex = newIndex;

    this.currentQuestion = data.questions.find(
      (_q, index) => index === newIndex
    );
  }

  get nextEnabled() {
    if (this.currentQuestionIndex + 1 >= this.numberOfQuestions) {
      return false;
    }

    return true;
  }

  next() {
    const nextIndex = this.currentQuestionIndex + 1;

    this.quiz.toPromise().then((data) => {
      if (data) {
        this.setCurrentQuestion(nextIndex, data);
      }
    });
  }

  get prevEnabled() {
    if (this.currentQuestionIndex - 1 < 0) {
      return false;
    }

    return true;
  }

  prev() {
    const prevIndex = this.currentQuestionIndex - 1;

    this.quiz.toPromise().then((data) => {
      if (data) {
        this.setCurrentQuestion(prevIndex, data);
      }
    });
  }
}
