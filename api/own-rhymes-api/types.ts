export enum ApiWordGender {
  MASCULINE = "masculine",
  FEMININE = "feminine",
}

export enum ApiWordPartOfSpeech {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
}

export type ApiWord = {
  word: string;
  syllables: number;
  gender: ApiWordGender;
  possibleStressPositions: ApiStressPosition[];
  defaultStressPosition: ApiStressPosition;
  partOfSpeech: ApiWordPartOfSpeech;
};

export enum ApiRhymeType {
  ACCURATE = "accurate",
  ASSONANCE = "assonance",
  DISASSONANCE = "disassonance",
}

export type ApiRhyme = {
  word: ApiWord;
  type: ApiRhymeType;
};

export type ApiStressPosition = number;

export const isApiStressPositionEqual = (a: ApiStressPosition, b: ApiStressPosition): boolean =>
  a === b;
