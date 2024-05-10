import { AppShellAside } from "@mantine/core";
import { notFound } from "next/navigation";

import { rhymesApi } from "@/api";
import { TableOfContents } from "@/components/ui/table-of-contents/table-of-contents";
import { RhymesList } from "@/features/rhymes-list";
import { rhymesService } from "@/services";
import { WordGender, WordPartOfSpeech, isWordGender, isWordPartOfSpeech } from "@/types/word";

export default async function Rhymes({
  params: { word: rawWord },
  searchParams,
}: {
  params: { word: string };
  searchParams: { genders?: string[]; partsOfSpeech?: string[] };
}) {
  const word = decodeURIComponent(rawWord);

  // TODO improve it
  const genders = searchParams.genders?.filter(isWordGender) ?? Object.values(WordGender);
  const partsOfSpeech =
    searchParams.partsOfSpeech?.filter(isWordPartOfSpeech) ?? Object.values(WordPartOfSpeech);

  const [rhymes, fetchedWord] = await Promise.all([
    rhymesService.getRhymes({ word, genders, partsOfSpeech }),
    rhymesApi.fetchWord(word),
  ]);

  if (!fetchedWord) {
    return notFound();
  }

  return (
    <>
      <RhymesList rhymes={rhymes} word={fetchedWord} />
      <AppShellAside p="md" w={250} visibleFrom="md">
        <TableOfContents />
      </AppShellAside>
    </>
  );
}
