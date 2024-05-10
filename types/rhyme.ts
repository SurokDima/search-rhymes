import { Word as Word } from "@/types/word";

export enum RhymeType {
  ACCURATE = "accurate",
  ASSONANCE = "assonance",
  DISASSONANCE = "disassonance",
}

export type Rhyme = {
  word: Word;
  type: RhymeType;
};
