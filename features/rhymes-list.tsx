"use client";

import { Divider, Group, Loader, Stack, Title } from "@mantine/core";
import { ReadonlyURLSearchParams, useParams, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

import { fetchRhymes } from "@/api";
import { WithWordsList } from "@/components/with-words-list";
import { isServer } from "@/lib/utils";
import { useTableOfContents } from "@/providers/table-of-contents-provider";

export type RhymesListProps = {
  rhymes: string[];
  word: string;
};

export const RhymesList: FC<RhymesListProps> = ({ rhymes, word: serverSideWord }) => {
  const { updateTableOfContents } = useTableOfContents();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { word: clientSideWord } = useParams<{ word: string }>();
  const word = clientSideWord ?? serverSideWord;
  const lastSearchParamsRef = useRef<ReadonlyURLSearchParams | null>(null);
  console.log("WORD", word, clientSideWord, serverSideWord);

  useEffect(() => {
    console.log("searchParams", searchParams);
    if (isServer() || lastSearchParamsRef.current === searchParams) return;
    if (!lastSearchParamsRef.current) {
      lastSearchParamsRef.current = searchParams;
      return;
    }
    const genders = searchParams.getAll("genders") ?? [];
    const partsOfSpeech = searchParams.getAll("partsOfSpeech") ?? [];

    setIsLoading(true);

    fetchRhymes({
      word,
      genders,
      partsOfSpeech,
    }).finally(() => setIsLoading(false));
  }, [searchParams.toString(), word]);

  useEffect(() => {
    console.log("updateTableOfContents");
    if (isLoading) return;
    updateTableOfContents();
  }, [updateTableOfContents, isLoading]);

  return isLoading ? (
    <Group justify="center">
      <Loader />
    </Group>
  ) : (
    <Stack gap="lg">
      <RhymesTitle order={2} heading="Точні рими" id="точні_рими">
        <Title order={2}>Точні рими</Title>
      </RhymesTitle>
      <Stack gap="md">
        <Divider
          label={
            <RhymesTitle id="2_склади" order={3} heading="2 склади">
              <Title order={3} size="sm">
                2 склади
              </Title>
            </RhymesTitle>
          }
          labelPosition="left"
        />
        <WithWordsList words={rhymes} />
      </Stack>
      <Stack gap="md">
        <Divider
          label={
            <RhymesTitle id="3_склади" order={3} heading="3 склади">
              <Title order={3} size="sm">
                3 склади
              </Title>
            </RhymesTitle>
          }
          labelPosition="left"
        />
        <WithWordsList words={rhymes} />
      </Stack>
      <RhymesTitle order={2} heading="Асонанси" id="асонанси">
        <Title order={2}>Асонанси</Title>
      </RhymesTitle>
      <Stack gap="md">
        <Divider
          label={
            <RhymesTitle id="Асонанси_2_склади" order={3} heading="2 склади">
              <Title size="sm">2 склади</Title>
            </RhymesTitle>
          }
          labelPosition="left"
        />
        <WithWordsList words={rhymes} />
      </Stack>
      <Stack gap="md">
        <Divider
          label={
            <RhymesTitle id="Асонанси_3_склади" order={3} heading="3 склади">
              <Title order={3} size="sm">
                3 склади
              </Title>
            </RhymesTitle>
          }
          labelPosition="left"
        />
        <WithWordsList words={rhymes} />
      </Stack>
      <RhymesTitle order={2} heading="Дисонанси" id="дисонанси">
        <Title order={2}>Дисонанси</Title>
      </RhymesTitle>
      <Stack gap="md">
        <Divider
          label={
            <RhymesTitle id="дисонанси_2_склади" order={3} heading="2 склади">
              <Title order={3} size="sm">
                2 склади
              </Title>
            </RhymesTitle>
          }
          labelPosition="left"
        />
        <WithWordsList words={rhymes} />
      </Stack>
      <Stack gap="md">
        <Divider
          label={
            <RhymesTitle id="дисонанси_3_склади" order={3} heading="3 склади">
              <Title order={3} size="sm">
                3 склади
              </Title>
            </RhymesTitle>
          }
          labelPosition="left"
        />
        <WithWordsList words={rhymes} />
      </Stack>
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
