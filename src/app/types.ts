export interface Person {
  id: string;
  name: string;
  image: {
    url: string;
    faceData?: any;
  };
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
      image: {
        url: string;
        faceData?: any;
      };
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
