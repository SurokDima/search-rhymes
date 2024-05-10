import { Rhyme } from "@/types/rhyme";
import { WordGender, WordPartOfSpeech } from "@/types/word";

export type IRhymesService = {
  getRhymes: (params: {
    word: string;
    genders: WordGender[];
    partsOfSpeech: WordPartOfSpeech[];
  }) => Promise<Rhyme[]>;
};
