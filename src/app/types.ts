export interface Person {
  id: string;
  name: string;
  image: string;
  role: string;
  quote?: string;
}

export type Question = {
  id: string;
  type: 'quote' | 'image';
  alternatives: Person[];
} & (
  | {
      type: 'quote';
      quote: string;
    }
  | {
      type: 'image';
      image: string;
    }
);

export interface Quiz {
  questions: Question[];
  answers: {
    [key: string]: string;
  };
  correctAnswers: {
    [key: string]: string;
  };
}
