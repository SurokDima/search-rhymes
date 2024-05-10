import { Rhyme, RhymeType } from "@/types/rhyme";
import { Word, WordGender, WordPartOfSpeech } from "@/types/word";

import { ApiRhyme, ApiRhymeType, ApiWord, ApiWordGender, ApiWordPartOfSpeech } from "./types";

export const mapWord = (apiWord: ApiWord): Word => ({
  ...apiWord,
  gender: mapGender(apiWord.gender),
  partOfSpeech: mapPartOfSpeech(apiWord.partOfSpeech),
});

const gendersMap: { [K in ApiWordGender]: WordGender } = {
  [ApiWordGender.MASCULINE]: WordGender.MASCULINE,
  [ApiWordGender.FEMININE]: WordGender.FEMININE,
};

export const mapGender = (apiGender: ApiWordGender): WordGender => {
  return gendersMap[apiGender];
};

const partOfSpeechMap: { [K in ApiWordPartOfSpeech]: WordPartOfSpeech } = {
  [ApiWordPartOfSpeech.NOUN]: WordPartOfSpeech.NOUN,
  [ApiWordPartOfSpeech.VERB]: WordPartOfSpeech.VERB,
  [ApiWordPartOfSpeech.ADJECTIVE]: WordPartOfSpeech.ADJECTIVE,
};

export const mapPartOfSpeech = (apiPartOfSpeech: ApiWordPartOfSpeech): WordPartOfSpeech => {
  return partOfSpeechMap[apiPartOfSpeech];
};

export const mapRhyme = (apiRhyme: ApiRhyme): Rhyme => ({
  type: mapRhymeType(apiRhyme.type),
  word: mapWord(apiRhyme.word),
});

const rhymeTypeMap: { [K in ApiRhymeType]: RhymeType } = {
  [ApiRhymeType.ACCURATE]: RhymeType.ACCURATE,
  [ApiRhymeType.ASSONANCE]: RhymeType.ASSONANCE,
  [ApiRhymeType.DISASSONANCE]: RhymeType.DISASSONANCE,
};

export const mapRhymeType = (apiRhymeType: ApiRhymeType): RhymeType => {
  return rhymeTypeMap[apiRhymeType];
};
