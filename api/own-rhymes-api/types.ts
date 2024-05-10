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
  stressPositions: number[];
  syllables: number;
  gender: ApiWordGender;
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
