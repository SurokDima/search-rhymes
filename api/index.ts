import { words } from "@/mocks/words";

export const fetchRhymes = async ({
  word,
  genders = [],
  partsOfSpeech,
}: {
  word: string;
  genders?: string[];
  partsOfSpeech?: string[];
}) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(words);
    }, 2000);
  });
};
