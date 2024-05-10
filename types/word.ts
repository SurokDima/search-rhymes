export enum WordGender {
  MASCULINE = "masculine",
  FEMININE = "feminine",
}

export enum WordPartOfSpeech {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
}

export type Word = {
  word: string;
  stressPositions: number[];
  syllables: number;
  gender: WordGender;
  partOfSpeech: WordPartOfSpeech;
};

export const isWordGender = (value: string): value is WordGender =>
  Object.values(WordGender).includes(value as WordGender);

export const isWordPartOfSpeech = (value: string): value is WordPartOfSpeech =>
  Object.values(WordPartOfSpeech).includes(value as WordPartOfSpeech);
