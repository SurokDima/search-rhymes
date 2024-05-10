import { ApiRhyme, ApiRhymeType, ApiWord, ApiWordGender, ApiWordPartOfSpeech } from "./types";

// generate an array of 100 random words
export const wordsMock: ApiWord[] = [
  {
    gender: ApiWordGender.MASCULINE,
    partOfSpeech: ApiWordPartOfSpeech.NOUN,
    stressPositions: [5],
    syllables: 3,
    word: `чоловік_1`,
  },
  {
    gender: ApiWordGender.MASCULINE,
    partOfSpeech: ApiWordPartOfSpeech.NOUN,
    stressPositions: [5],
    syllables: 3,
    word: `чоловік_2`,
  },
];

export const rhymesMock: Record<string, ApiRhyme[]> = {
  ["чоловік_1"]: [
    {
      type: ApiRhymeType.ACCURATE,
      word: {
        gender: ApiWordGender.FEMININE,
        partOfSpeech: ApiWordPartOfSpeech.NOUN,
        stressPositions: [1],
        syllables: 2,
        word: "рима_1_1",
      },
    },
  ],
  ["чоловік_2"]: [
    {
      type: ApiRhymeType.ACCURATE,
      word: {
        gender: ApiWordGender.FEMININE,
        partOfSpeech: ApiWordPartOfSpeech.NOUN,
        stressPositions: [1],
        syllables: 2,
        word: "рима_2_1",
      },
    },
  ],
};
