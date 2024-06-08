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
  possibleStressPositions: StressPosition[];
  syllables: number;
  gender: WordGender;
  defaultStressPosition: StressPosition;
  partOfSpeech: WordPartOfSpeech;
};

export type StressedWord = Word & {
  currentStressPosition: StressPosition;
};

export type StressPosition = number;

export const isWordGender = (value: string): value is WordGender =>
  Object.values(WordGender).includes(value as WordGender);

export const isWordPartOfSpeech = (value: string): value is WordPartOfSpeech =>
  Object.values(WordPartOfSpeech).includes(value as WordPartOfSpeech);

export const isStressPositionEqual = (a: StressPosition, b: StressPosition): boolean => a === b;

export const createStressedWord = (
  word: Word,
  currentStressPosition: StressPosition
): StressedWord => ({
  ...word,
  currentStressPosition,
});
