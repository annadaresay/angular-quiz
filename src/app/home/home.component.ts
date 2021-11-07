import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service/data.service';
import { Person } from '../types';

@Component({
  selector: 'page-home',
  template: `
    <div class="container">
      <h1>Daresay<br />people quiz!</h1>
      <ui-spacer [size]="20"></ui-spacer>
      <h2>How well do you know your co-workers?</h2>
      <ui-spacer [size]="40"></ui-spacer>
      <ui-button [title]="'Get started!'" [routerLink]="'/quiz'"></ui-button>
      <ui-spacer [size]="80"></ui-spacer>
      <div class="personsContainer">
        <div
          class="person"
          *ngFor="let person of randomPersons"
          [ngStyle]="{ 'background-image': 'url(' + person.image.url + ')' }"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .personsContainer {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
      }

      .person {
        width: 120px;
        height: 180px;
        background-color: var(--page-bg-color);
        background-size: cover;
        background-position: center;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  personsSubscription?: Subscription;
  randomPersons: Person[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.personsSubscription = this.dataService.personsSubject.subscribe(
      (persons) => {
        this.setRandomPersons(persons);
      }
    );
  }

  setRandomPersons(from: Person[]) {
    const shuffled = from.sort(() => 0.5 - Math.random());
    this.randomPersons = shuffled.slice(0, 5);
  }

  ngOnDestroy(): void {
    this.personsSubscription?.unsubscribe();
  }
}
