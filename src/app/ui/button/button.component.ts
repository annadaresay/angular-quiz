import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-button',
  template: `<div role="button" [ngClass]="{ disabled: disabled }">
    <span class="buttonLabel">{{ title }}</span>
  </div>`,
  styles: [
    `
      div {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        padding: 0 20px;
        background: var(--button-primary-bg);
        color: var(--button-primary-color);
      }
      div.disabled {
        background: var(--button-disabled-bg);
        color: var(--button-disabled-color);
      }
      div:hover:not(.disabled) {
        cursor: pointer;
        opacity: 0.8;
      }
    `,
  ],
})
export class ButtonComponent implements OnInit {
  @Input() title!: string;
  @Input() disabled?: boolean;

  constructor() {}

  ngOnInit(): void {
    console.log('disabled: ', this.title, this.disabled);
  }
}
