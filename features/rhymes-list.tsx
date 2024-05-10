"use client";

import { Divider, Group, Loader, Stack, Title } from "@mantine/core";
import { groupBy, mapValues } from "lodash-es";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";

import { WithWordsList } from "@/components/with-words-list";
import { isServer } from "@/lib/utils";
import { useTableOfContents } from "@/providers/table-of-contents-provider";
import { rhymesService } from "@/services";
import { Rhyme, RhymeType } from "@/types/rhyme";
import { Word, isWordGender, isWordPartOfSpeech } from "@/types/word";

export type RhymesListProps = {
  rhymes: Rhyme[];
  word: Word;
};

const SECTION_TITLES: {
  [key in RhymeType]: {
    title: string;
    id: string;
  };
} = {
  [RhymeType.ACCURATE]: { id: "точні_рими", title: "Точні рими" },
  [RhymeType.ASSONANCE]: { id: "асонанси", title: "Асонанси" },
  [RhymeType.DISASSONANCE]: { id: "дисонанси", title: "Дисонанси" },
};

export const RhymesList: FC<RhymesListProps> = ({ rhymes, word }) => {
  const { updateTableOfContents } = useTableOfContents();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const lastSearchParamsRef = useRef<ReadonlyURLSearchParams | null>(null);

  useEffect(() => {
    if (isServer() || lastSearchParamsRef.current === searchParams) return;
    if (!lastSearchParamsRef.current) {
      lastSearchParamsRef.current = searchParams;
      return;
    }
    const genders = searchParams.getAll("genders").filter(isWordGender);
    const partsOfSpeech = searchParams.getAll("partsOfSpeech").filter(isWordPartOfSpeech);

    setIsLoading(true);

    rhymesService
      .getRhymes({ word: word.word, genders, partsOfSpeech })
      .finally(() => setIsLoading(false));
    // We need to spy on searchParams.toString() because searchParams link gets updated when hash params are changed
    // while the value is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), word]);

  useEffect(() => {
    if (isLoading) return;
    updateTableOfContents();
  }, [updateTableOfContents, isLoading]);

  const groupedRhymes = useMemo(
    () => mapValues(groupRhymesByType(rhymes), (rhymes) => groupRhymesBySyllables(rhymes)),
    [rhymes]
  );

  console.log("groupedRhymes", groupedRhymes, rhymes);

  return isLoading ? (
    <Group justify="center">
      <Loader />
    </Group>
  ) : (
    <Stack gap="lg">
      {Object.entries(groupedRhymes).map(([type, groupedRhymes]) => {
        const { title, id } = SECTION_TITLES[type as RhymeType];

        return (
          <RhymesSection title={title} titleId={id} key={type} groupedRhymes={groupedRhymes} />
        );
      })}
    </Stack>
  );
};

type RhymesSectionProps = {
  /** Rhymes grouped by syllables number */
  groupedRhymes: Record<number, Rhyme[]>;
  title: string;
  titleId: string;
};

const RhymesSection: FC<RhymesSectionProps> = ({ title, titleId, groupedRhymes }) => {
  return (
    <Stack gap="md">
      <RhymesTitle order={2} heading={title} id={titleId}>
        <Title order={2}>{title}</Title>
      </RhymesTitle>
      {Object.entries(groupedRhymes).map(([syllables, rhymes]) => (
        <>
          <Divider
            label={
              <RhymesTitle
                id={`${titleId}_${syllables}_склади`}
                order={3}
                heading={`${syllables} склади`}
              >
                <Title order={3} size="sm">
                  {syllables} склади
                </Title>
              </RhymesTitle>
            }
            labelPosition="left"
          />
          <WithWordsList words={rhymes.map((rhyme) => rhyme.word)} />
        </>
      ))}
    </Stack>
  );
};

const RhymesTitle: FC<{
  children: React.ReactNode;
  id: string;
  order: number;
  heading: string;
}> = ({ children, id, order, heading }) => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{ position: "absolute", top: "-4rem" }}
        id={id}
        data-order={String(order)}
        data-heading={heading}
      />
      {children}
    </div>
  );
};

const groupRhymesByType = (rhymes: Rhyme[]): Record<RhymeType, Rhyme[]> => {
  return groupBy(rhymes, (rhyme) => rhyme.type) as Record<RhymeType, Rhyme[]>;
};

const groupRhymesBySyllables = (rhymes: Rhyme[]): Record<number, Rhyme[]> => {
  return groupBy(rhymes, (rhyme) => rhyme.word.syllables);
};
