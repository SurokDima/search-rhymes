import { rhymesApi } from "@/api";
import { IRhymesService } from "@/services/types";
import { Rhyme } from "@/types/rhyme";
import { WordGender, WordPartOfSpeech } from "@/types/word";

export class RhymesService implements IRhymesService {
  public async getRhymes({
    word,
    genders,
    partsOfSpeech,
  }: {
    word: string;
    genders: WordGender[];
    partsOfSpeech: WordPartOfSpeech[];
  }): Promise<Rhyme[]> {
    const rhymes = await rhymesApi.fetchRhymes(word);

    return rhymes.filter(
      (rhyme) =>
        partsOfSpeech.includes(rhyme.word.partOfSpeech) && genders.includes(rhyme.word.gender)
    );
  }
}
