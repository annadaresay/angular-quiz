import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'quiz-question-image',
  template: `
    <h2>Who is this?</h2>
    <ui-spacer [size]="20"></ui-spacer>
    <div
      class="personContainer"
      *ngIf="!!faceBox"
      [ngStyle]="{ 'width.px': IMAGE_WIDTH }"
    >
      <img src="{{ image.url }}" class="person" />
      <div
        class="faceBox"
        [ngStyle]="{
          'top.px': faceBox.y,
          'left.px': faceBox.x,
          'width.px': faceBox.width,
          'height.px': faceBox.height
        }"
      >
        <div class="eyePatch"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .personContainer {
        display: flex;
        position: relative;
        width: 240px;
      }

      .person {
        width: 100%;
        align-self: flex-start;
        background-color: var(--page-bg-color);
      }

      .faceBox {
        position: absolute;
        z-indez: 1;
      }

      .eyePatch {
        top: 10%;
        left: 0;
        width: 100%;
        height: 30%;
        position: absolute;
        background-color: #000;
      }
    `,
  ],
})
export class QuestionImageComponent implements OnInit {
  IMAGE_WIDTH = 240;

  @Input() image!: {
    url: string;
    faceData?: {
      _imageDims: {
        _height: number;
        _width: number;
      };
      _box: {
        _height: number;
        _width: number;
        _x: number;
        _y: number;
      };
    };
  };

  faceBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.image.faceData) {
      const scale = this.IMAGE_WIDTH / this.image.faceData._imageDims._width;

      const { _x, _y, _width, _height } = this.image.faceData._box;

      this.faceBox = {
        x: scale * _x,
        y: scale * _y,
        width: scale * _width,
        height: scale * _height,
      };
    } else {
      this.faceBox = undefined;
    }
  }
}
