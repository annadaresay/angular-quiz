import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quiz-question-quote',
  template: ` <h2>{{ title }}</h2>
    <ui-spacer [size]="20"></ui-spacer>
    <p>{{ quote }}</p>
    <ui-spacer [size]="20"></ui-spacer>
    <ui-radio-group
      name="question-1"
      [items]="this.alternatives"
    ></ui-radio-group>`,
  styles: [``],
})
export class QuestionQuoteComponent implements OnInit {
  title = 'Who likes this quote?';
  quote =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempor, ligula in dapibus vulputate, sem leo pharetra nisl, non tincidunt dui odio a leo.';
  alternatives = [
    { id: 'test-1', label: 'Test 1' },
    { id: 'test-2', label: 'Test 2' },
    { id: 'test-3', label: 'Test 3' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
