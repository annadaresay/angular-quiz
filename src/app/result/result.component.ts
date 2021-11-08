import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service/data.service';
import { Quiz } from '../types';

enum Grade {
  Gold,
  Silver,
  Bronse,
}

const messages: { [key in Grade]: string } = {
  [Grade.Gold]: "Wow! You're a genius!?",
  [Grade.Silver]:
    "It's OK being average, but if you're looking for gold you need to step up...",
  [Grade.Bronse]: "The lights are on, but nobody's home...",
};

const medals: { [key in Grade]: string } = {
  [Grade.Gold]: '🥇',
  [Grade.Silver]: '🥈',
  [Grade.Bronse]: '🥉',
};

@Component({
  selector: 'page-result',
  template: `
    <div class="container">
      <h3>Your result:</h3>
      <ui-spacer [size]="20"></ui-spacer>
      <h1>{{ result }}</h1>

      <ui-spacer [size]="80"></ui-spacer>

      <div class="content">
        <h1 class="medal">{{ medal }}</h1>
        <ui-spacer [size]="40"></ui-spacer>
        <h2>
          <i>{{ message }}</i>
        </h2>
      </div>

      <div class="footer">
        <ui-button
          [title]="'Play again!'"
          (click)="playAgainClick()"
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

      .content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .medal {
        font-size: 160px;
        line-height: 100%;
        text-align: center;
      }

      .footer {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }

      @media screen and (max-width: 960px) {
        .content {
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
      }
    `,
  ],
})
export class ResultComponent implements OnInit {
  result?: string;
  message?: string;
  medal?: string;
  quizSubscription?: Subscription;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.quizSubscription = this.dataService.quizSubject.subscribe((quiz) => {
      if (!quiz) {
        return;
      }

      const correctCount = this.countCorrectAnswers(quiz);
      const questionCount = quiz.questions.length;
      const grade = this.getGrade(correctCount, questionCount);

      this.result = `${correctCount}/${questionCount} points`;
      this.message = messages[grade];
      this.medal = medals[grade];
    });
  }

  countCorrectAnswers(quiz: Quiz): number {
    let count = 0;

    for (const [questionId, answer] of Object.entries(quiz.answers)) {
      const correctAnswer = quiz.correctAnswers[questionId];
      if (correctAnswer === answer) {
        count++;
      }
    }

    return count;
  }

  getGrade(correctCount: number, questionCount: number): Grade {
    const ratio = correctCount / questionCount;

    if (ratio === 1.0) {
      return Grade.Gold;
    }
    if (ratio >= 0.5) {
      return Grade.Silver;
    }
    return Grade.Bronse;
  }

  playAgainClick(): void {
    this.dataService.generateQuiz();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
  }
}
