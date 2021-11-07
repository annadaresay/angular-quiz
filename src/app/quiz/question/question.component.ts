import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../types';

@Component({
  selector: 'quiz-question',
  template: `
    <quiz-question-quote
      *ngIf="question.type === 'quote'"
      [quote]="question.quote"
    ></quiz-question-quote>

    <quiz-question-image
      *ngIf="question.type === 'image'"
      [image]="question.image"
    ></quiz-question-image>

    <ui-spacer [size]="20"></ui-spacer>

    <ui-radio-group
      name="{{ question.id }}"
      [items]="radioItems"
      [selected]="answer"
      [onChange]="onAnswerChange"
    ></ui-radio-group>
  `,
  styles: [``],
})
export class QuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() answer!: string;
  @Input() onAnswerChange!: (id: string) => void;

  radioItems: { id: string; label: string }[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.radioItems = this.question.alternatives.map((a) => ({
      id: a.id,
      label: a.name,
    }));
  }
}
