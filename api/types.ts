import { Rhyme } from "@/types/rhyme";
import { Word } from "@/types/word";

export type IRhymesAPI = {
  fetchRhymes: (word: string) => Promise<Rhyme[]>;
  searchWords: (startWith: string) => Promise<Word[]>;
  fetchWord: (word: string) => Promise<Word | null>;
};
