import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Person, Quiz } from '../types';
import {
  generateImageQuestions,
  generateQuoteQuestions,
  shuffle,
} from './helpers';
import { getStoredPersons, setStoredPersons } from './storage';

const PERSONS_ENDPOINT = '/assets/data.json';
const NUMBER_OF_QUOTE_QUESTIONS = 5;
const NUMBER_OF_IMAGE_QUESTIONS = 5;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private persons: Person[] = [];
  personsSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);

  private quiz?: Quiz;
  quizSubject: BehaviorSubject<Quiz | undefined> = new BehaviorSubject<
    Quiz | undefined
  >(undefined);

  constructor(private http: HttpClient) {
    const storedPersons = getStoredPersons();

    if (storedPersons) {
      this.updatePersons(storedPersons);
      this.generateQuiz();
      return;
    }

    this.http
      .get<{ persons: Person[] }>(PERSONS_ENDPOINT)
      .subscribe(({ persons }) => {
        setStoredPersons(persons);
        this.updatePersons(persons);
        this.generateQuiz();
      });
  }

  private updatePersons(persons: Person[]) {
    this.persons = persons;
    this.personsSubject.next(persons);
  }

  private updateQuiz(quiz: Quiz) {
    this.quiz = quiz;
    this.quizSubject.next(quiz);
  }

  generateQuiz() {
    const { questions: quoteQuestions, answers: quoteAnswers } =
      generateQuoteQuestions(this.persons, NUMBER_OF_QUOTE_QUESTIONS);

    const { questions: imageQuestions, answers: imageAnswers } =
      generateImageQuestions(this.persons, NUMBER_OF_IMAGE_QUESTIONS);

    this.updateQuiz({
      questions: shuffle([...quoteQuestions, ...imageQuestions]),
      correctAnswers: { ...quoteAnswers, ...imageAnswers },
      answers: {},
    });
  }

  setQuizAnswer({
    questionId,
    answer,
  }: {
    questionId: string;
    answer: string;
  }) {
    if (!this.quiz) {
      return;
    }

    this.updateQuiz({
      ...this.quiz,
      answers: {
        ...this.quiz.answers,
        [questionId]: answer,
      },
    });
  }
}
