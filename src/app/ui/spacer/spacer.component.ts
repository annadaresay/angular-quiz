import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-spacer',
  template: `<div [ngStyle]="{ 'width.px': size, 'height.px': size }"></div>`,
  styles: [
    `
      div {
        display: flex;
      }
    `,
  ],
})
export class SpacerComponent implements OnInit {
  @Input() size!: number;

  constructor() {}

  ngOnInit(): void {}
}
