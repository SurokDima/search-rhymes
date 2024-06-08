import { Rhyme } from "@/types/rhyme";
import { StressPosition, Word } from "@/types/word";

export type IRhymesAPI = {
  fetchRhymes: (word: string, stressPosition: StressPosition) => Promise<Rhyme[]>;
  searchWords: (startWith: string) => Promise<Word[]>;
  fetchWord: (word: string) => Promise<Word | null>;
};
