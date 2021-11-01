import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-quiz',
  template: `<div class="container">
    <h3>Question 1/10</h3>
    <ui-spacer [size]="80"></ui-spacer>
    <quiz-question></quiz-question>
    <div class="footer">
      <ui-button [title]="'< Back'"></ui-button>
      <ui-button [title]="'Next >'"></ui-button>
    </div>
  </div>`,
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
  constructor() {}

  ngOnInit(): void {}
}
