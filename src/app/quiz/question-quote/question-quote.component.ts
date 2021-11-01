import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/types';

@Component({
  selector: 'quiz-question-quote',
  template: `
    <h2>Who likes this quote?</h2>
    <ui-spacer [size]="20"></ui-spacer>
    <p [innerHTML]="quote"></p>
  `,
  styles: [``],
})
export class QuestionQuoteComponent implements OnInit {
  @Input() quote!: string;

  constructor() {}

  ngOnInit(): void {}
}
