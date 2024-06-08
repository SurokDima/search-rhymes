import { rhymesApi } from "@/api";
import { IRhymesService } from "@/services/types";
import { Rhyme } from "@/types/rhyme";
import { StressPosition, WordPartOfSpeech } from "@/types/word";

export class RhymesService implements IRhymesService {
  public async getRhymes({
    word,
    // genders,
    stressPosition,
    partsOfSpeech,
  }: {
    word: string;
    stressPosition: StressPosition;
    // genders: WordGender[];
    partsOfSpeech: WordPartOfSpeech[];
  }): Promise<Rhyme[]> {
    console.log("RhymesService -> getRhymes -> word", word, stressPosition, partsOfSpeech);
    const rhymes = await rhymesApi.fetchRhymes(word, stressPosition);
    console.log(
      "RhymesService -> getRhymes -> rhymes",
      rhymes,
      rhymes.filter((rhyme) => partsOfSpeech.includes(rhyme.word.partOfSpeech))
    );
    return rhymes.filter((rhyme) => partsOfSpeech.includes(rhyme.word.partOfSpeech));
  }
}
