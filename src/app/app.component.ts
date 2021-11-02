import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .container {
        width: 960px;
        min-height: 100vh;
        height: 0px;
        background-color: var(--content-bg-color);
        padding: 64px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'angular-quiz';

  constructor() {}

  ngOnInit(): void {}
}
