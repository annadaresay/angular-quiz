import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person, Question, Quiz } from './types';

const PERSONS_ENDPOINT = '/assets/data.json';
const NUMBER_OF_QUOTE_QUESTIONS = 5;
const NUMBER_OF_IMAGE_QUESTIONS = 5;

const shuffle = <T extends {}>(array: T[]): T[] =>
  array.sort(() => 0.5 - Math.random());

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  persons: Person[] = [];
  quiz: Quiz | undefined;

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
        // TODO: This seem to not trigger updates as expected
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

  getPersons(): Observable<Person[]> {
    return of(this.persons);
  }

  generateQuiz() {
    // Generate quote questions
    const { questions: quoteQuestions, answers: quoteAnswers } =
      this.generateQuoteQuestions(NUMBER_OF_QUOTE_QUESTIONS);

    // Generate image questions
    const { questions: imageQuestions, answers: imageAnswers } =
      this.generateImageQuestions(NUMBER_OF_IMAGE_QUESTIONS);

    this.quiz = {
      questions: shuffle([...quoteQuestions, ...imageQuestions]),
      correctAnswers: { ...quoteAnswers, ...imageAnswers },
      answers: {},
    };
  }

  generateQuoteQuestions(amount: number) {
    if (!this.persons) {
      throw Error();
    }

    const persons = shuffle(this.persons);

    const answers: { [key: string]: string } = persons
      .filter((p) => !!p.quote)
      .slice(0, amount)
      .reduce(
        (prev, curr, index) => ({
          ...prev,
          [`quote-question-${index}`]: curr.id,
        }),
        {}
      );

    const questions: Question[] = Object.entries(answers).map(
      ([questionId, answer]) => {
        const person = persons.find((p) => p.id === answer) as Person;

        const alternatives = [
          ...shuffle(persons)
            .filter((p) => p.id !== person.id)
            .slice(0, 2),
          person,
        ];

        return {
          id: questionId,
          type: 'quote',
          quote: person.quote as string,
          alternatives: shuffle(alternatives),
        };
      }
    );

    return {
      answers,
      questions,
    };
  }

  generateImageQuestions(amount: number) {
    if (!this.persons) {
      throw Error();
    }

    const persons = shuffle(this.persons);

    const answers: { [key: string]: string } = persons
      .filter((p) => !!p.image.faceData)
      .slice(0, amount)
      .reduce(
        (prev, curr, index) => ({
          ...prev,
          [`image-question-${index}`]: curr.id,
        }),
        {}
      );

    const questions: Question[] = Object.entries(answers).map(
      ([questionId, answer]) => {
        const person = persons.find((p) => p.id === answer) as Person;

        const alternatives = [
          ...shuffle(persons)
            .filter((p) => p.id !== person.id)
            .slice(0, 2),
          person,
        ];

        return {
          id: questionId,
          type: 'image',
          image: person.image,
          alternatives: shuffle(alternatives),
        };
      }
    );

    return {
      answers,
      questions,
    };
  }

  getQuiz(): Observable<Quiz | undefined> {
    return of(this.quiz);
  }
}
