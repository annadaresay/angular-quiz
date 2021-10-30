import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from './types';

const PERSONS_ENDPOINT = 'api/persons';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  persons: Person[] | undefined;

  constructor(private http: HttpClient) {
    const storedPersons = this.getStoredPersons();

    if (storedPersons) {
      this.persons = storedPersons;
      return;
    }

    this.http
      .get<{ persons: Person[] }>(PERSONS_ENDPOINT)
      .toPromise()
      .then(({ persons }) => {
        this.setStoredPersons(persons);
        this.persons = persons;
      });
  }

  // Store person data in local storage
  private getStoredPersons() {
    const value = localStorage.getItem(PERSONS_ENDPOINT);

    if (!value) {
      return undefined;
    }

    try {
      const { persons } = JSON.parse(value);
      return persons as Person[];
    } catch (error) {
      localStorage.removeItem(PERSONS_ENDPOINT);
      return undefined;
    }
  }

  // Get person data from local storage
  private setStoredPersons(persons: Person[]) {
    const timestamp = new Date().toISOString();
    const value = JSON.stringify({
      timestamp,
      persons,
    });

    localStorage.setItem(PERSONS_ENDPOINT, value);
  }

  getPersons(): Observable<Person[] | undefined> {
    return of(this.persons);
  }
}
