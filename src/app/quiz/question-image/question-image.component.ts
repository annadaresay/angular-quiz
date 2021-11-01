import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'quiz-question-image',
  template: `
    <h2>Who is this?</h2>
    <ui-spacer [size]="20"></ui-spacer>
    <div class="personContainer">
      <div class="person" style="{{ image }}"></div>
      <div class="cover"></div>
    </div>
  `,
  styles: [
    `
      .personContainer {
        display: flex;
        position: relative;
        width: 240px;
        height: 240px;
      }

      .cover {
        position: absolute;
        top: 80px;
        right: 60px;
        width: 120px;
        height: 20px;
        background-color: var(--grey-ultra-dark);
        z-indez: 1;
      }

      .person {
        width: 100%;
        height: 100%;
        background-color: var(--page-bg-color);
        background-size: cover;
        background-position: center;
      }
    `,
  ],
})
export class QuestionImageComponent implements OnInit {
  @Input() image!: string;

  constructor() {}

  ngOnInit(): void {}
}
