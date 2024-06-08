import { IRhymesAPI } from "@/api/types";
import { Rhyme } from "@/types/rhyme";
import { StressPosition, Word } from "@/types/word";

import { mapRhyme, mapToApiStressPosition, mapWord } from "./mappers";
import { rhymesMock, wordsMock } from "./mocks";

const DELAY = 1000;

export class OwnRhymesAPI implements IRhymesAPI {
  public fetchRhymes(word: string, stressPosition: StressPosition): Promise<Rhyme[]> {
    const apiStressPosition = mapToApiStressPosition(stressPosition);

    return new Promise((resolve) => {
      setTimeout(() => {
        const rhymes = rhymesMock.find(
          ({ target }) => target.word === word && target.stressPosition === apiStressPosition
        )?.rhymes;

        resolve(rhymes?.map(mapRhyme) ?? []);
      }, DELAY);
    });
  }

  public searchWords(startWith: string): Promise<Word[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const words = wordsMock.filter((word) => word.word.startsWith(startWith));
        resolve(words.map(mapWord).slice(0, 10));
      }, DELAY);
    });
  }

  public fetchWord(word: string): Promise<Word | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundWord = wordsMock.find((w) => w.word === word);
        resolve(foundWord ? mapWord(foundWord) : null);
      }, DELAY);
    });
  }
}
