import { AppShellAside } from "@mantine/core";

import { fetchRhymes } from "@/api";
import { TableOfContents } from "@/components/ui/table-of-contents/table-of-contents";
import { RhymesList } from "@/features/rhymes-list";

export default async function Rhymes({
  params: { word },
  searchParams,
}: {
  params: { word: string };
  searchParams: { genders?: string[]; partsOfSpeech?: string[] };
}) {
  const genders = searchParams.genders ?? [];
  const partsOfSpeech = searchParams.partsOfSpeech ?? [];

  const rhymes = await fetchRhymes({
    word,
    genders,
    partsOfSpeech,
  });

  return (
    <>
      <RhymesList rhymes={rhymes} word={word} />{" "}
      <AppShellAside p="md" w={250} visibleFrom="md">
        <TableOfContents />
      </AppShellAside>
    </>
  );
}
