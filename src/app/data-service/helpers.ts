import { Person, Question } from '../types';

export const shuffle = <T extends {}>(array: T[]): T[] =>
  array.sort(() => 0.5 - Math.random());

export const generateQuoteQuestions = (_persons: Person[], amount: number) => {
  if (!_persons) {
    throw Error();
  }

  const persons = shuffle(_persons);

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
};

export const generateImageQuestions = (_persons: Person[], amount: number) => {
  if (!_persons) {
    throw Error();
  }

  const persons = shuffle(_persons);

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
};
