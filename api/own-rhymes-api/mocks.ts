import {
  ApiRhyme,
  ApiRhymeType,
  ApiStressPosition,
  ApiWord,
  ApiWordGender,
  ApiWordPartOfSpeech,
} from "./types";

export const wordsMock: ApiWord[] = [
  {
    gender: ApiWordGender.MASCULINE,
    partOfSpeech: ApiWordPartOfSpeech.NOUN,
    defaultStressPosition: 5,
    possibleStressPositions: [1, 3, 5],
    syllables: 3,
    word: `чоловік_1`,
  },
  {
    gender: ApiWordGender.MASCULINE,
    partOfSpeech: ApiWordPartOfSpeech.NOUN,
    defaultStressPosition: 1,
    possibleStressPositions: [1, 3],
    syllables: 3,
    word: `чоловік_2`,
  },
];

export const rhymesMock: {
  target: { word: string; stressPosition: ApiStressPosition };
  rhymes: ApiRhyme[];
}[] = [
  {
    target: {
      word: `чоловік_1`,
      stressPosition: 5,
    },
    rhymes: [
      {
        type: ApiRhymeType.ACCURATE,
        word: {
          gender: ApiWordGender.FEMININE,
          partOfSpeech: ApiWordPartOfSpeech.NOUN,
          defaultStressPosition: 1,
          possibleStressPositions: [1, 3],
          syllables: 2,
          word: "рима_1_1",
        },
      },
      {
        type: ApiRhymeType.ACCURATE,
        word: {
          gender: ApiWordGender.FEMININE,
          partOfSpeech: ApiWordPartOfSpeech.NOUN,
          defaultStressPosition: 1,
          possibleStressPositions: [1, 3],
          syllables: 2,
          word: "рима_1_2",
        },
      },
      {
        type: ApiRhymeType.ACCURATE,
        word: {
          gender: ApiWordGender.FEMININE,
          partOfSpeech: ApiWordPartOfSpeech.NOUN,
          defaultStressPosition: 1,
          possibleStressPositions: [1, 3],
          syllables: 2,
          word: "рима_1_3",
        },
      },
    ],
  },
  {
    target: {
      word: `чоловік_1`,
      stressPosition: 1,
    },
    rhymes: [
      {
        type: ApiRhymeType.ACCURATE,
        word: {
          gender: ApiWordGender.FEMININE,
          partOfSpeech: ApiWordPartOfSpeech.NOUN,
          defaultStressPosition: 1,
          possibleStressPositions: [1, 3],
          syllables: 2,
          word: "рима_1_1",
        },
      },
    ],
  },
  {
    target: {
      word: `чоловік_1`,
      stressPosition: 3,
    },
    rhymes: [
      {
        type: ApiRhymeType.ACCURATE,
        word: {
          gender: ApiWordGender.FEMININE,
          partOfSpeech: ApiWordPartOfSpeech.NOUN,
          defaultStressPosition: 1,
          possibleStressPositions: [1, 3],
          syllables: 2,
          word: "рима_1_1",
        },
      },
    ],
  },
  {
    target: {
      word: `чоловік_2`,
      stressPosition: 1,
    },
    rhymes: [
      {
        type: ApiRhymeType.ACCURATE,
        word: {
          gender: ApiWordGender.FEMININE,
          partOfSpeech: ApiWordPartOfSpeech.NOUN,
          defaultStressPosition: 1,
          possibleStressPositions: [1, 3],
          syllables: 2,
          word: "рима_2_1",
        },
      },
    ],
  },
  {
    target: {
      word: `чоловік_2`,
      stressPosition: 3,
    },
    rhymes: [
      {
        type: ApiRhymeType.ACCURATE,
        word: {
          gender: ApiWordGender.FEMININE,
          partOfSpeech: ApiWordPartOfSpeech.NOUN,
          defaultStressPosition: 1,
          possibleStressPositions: [1, 3],
          syllables: 2,
          word: "рима_2_1",
        },
      },
    ],
  },
];
