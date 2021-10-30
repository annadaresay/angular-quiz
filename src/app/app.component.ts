import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsService } from './questions.service';
import { Person } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-quiz';
  persons: Observable<Person[] | undefined> | undefined;

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.persons = this.questionsService.getPersons();
  }
}
