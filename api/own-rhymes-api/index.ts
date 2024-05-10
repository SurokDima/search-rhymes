import { IRhymesAPI } from "@/api/types";
import { Rhyme } from "@/types/rhyme";
import { Word } from "@/types/word";

import { mapRhyme, mapWord } from "./mappers";
import { rhymesMock, wordsMock } from "./mocks";

export class OwnRhymesAPI implements IRhymesAPI {
  public fetchRhymes(word: string): Promise<Rhyme[]> {
    console.log(`getting rhymes for ${word}`, rhymesMock);
    return new Promise((resolve) => {
      setTimeout(() => {
        const rhymes = rhymesMock[word] ?? [];
        resolve(rhymes.map(mapRhyme));
      }, 2000);
    });
  }

  public searchWords(startWith: string): Promise<Word[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const words = wordsMock.filter((word) => word.word.startsWith(startWith));
        resolve(words.map(mapWord).slice(0, 10));
      }, 2000);
    });
  }

  public fetchWord(word: string): Promise<Word | null> {
    console.log(`Sending request to get ${word}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        const foundWord = wordsMock.find((w) => w.word === word);
        resolve(foundWord ? mapWord(foundWord) : null);
      }, 2000);
    });
  }
}
