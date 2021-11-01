import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-radio-group',
  template: `
    <div class="container">
      <div *ngFor="let item of items" class="item-container">
        <input
          type="radio"
          id="{{ item.id }}"
          name="{{ name }}"
          value="{{ item.id }}"
        />
        <ui-spacer [size]="10"></ui-spacer>
        <label for="{{ item.id }}">{{ item.label }}</label>
      </div>
    </div>
  `,
  styles: [
    `
      .item-container {
        display: flex;
        height: 40px;
        align-items: center;
      }

      input {
        margin: 0;
        padding: 0;
      }

      label {
        font-family: var(--font-family-title);
        font-weight: 700;
        text-transform: uppercase;
        font-size: 18px;
        line-height: 28px;
        margin: 0;
      }
    `,
  ],
})
export class RadioGroupComponent implements OnInit {
  @Input() name!: string;
  @Input() items!: {
    id: string;
    label: string;
    checked?: boolean;
  }[];

  constructor() {}

  ngOnInit(): void {}
}
