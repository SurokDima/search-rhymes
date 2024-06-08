import { Rhyme } from "@/types/rhyme";
import { StressPosition, WordPartOfSpeech } from "@/types/word";

export type IRhymesService = {
  getRhymes: (params: {
    word: string;
    // genders: WordGender[];
    stressPosition: StressPosition;
    partsOfSpeech: WordPartOfSpeech[];
  }) => Promise<Rhyme[]>;
};
