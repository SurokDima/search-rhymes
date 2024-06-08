import { AppShellAside } from "@mantine/core";
import { notFound } from "next/navigation";

import { rhymesApi } from "@/api";
import { TableOfContents } from "@/components/ui/table-of-contents/table-of-contents";
import { RhymesList } from "@/features/rhymes-list";
import { rhymesService } from "@/services";
import { WordPartOfSpeech, isWordPartOfSpeech } from "@/types/word";

export default async function Rhymes({
  params: { word: rawWord },
  searchParams,
}: {
  params: { word: string };
  searchParams: { partsOfSpeech?: string[]; stressPosition?: string };
}) {
  const word = decodeURIComponent(rawWord);
  const stressPosition = searchParams.stressPosition ? Number(searchParams.stressPosition) : null;

  // TODO improve it
  // const genders = searchParams.genders?.filter(isWordGender) ?? Object.values(WordGender);
  const partsOfSpeech =
    searchParams.partsOfSpeech?.filter(isWordPartOfSpeech) ?? Object.values(WordPartOfSpeech);

  const fetchedWord = await rhymesApi.fetchWord(word);

  if (!fetchedWord) {
    return notFound();
  }

  const rhymes = await rhymesService.getRhymes({
    word,
    partsOfSpeech,
    stressPosition: stressPosition ?? fetchedWord?.defaultStressPosition,
  });

  return (
    <>
      <RhymesList rhymes={rhymes} word={fetchedWord} />
      <AppShellAside p="md" w={250} visibleFrom="md">
        <TableOfContents />
      </AppShellAside>
    </>
  );
}
