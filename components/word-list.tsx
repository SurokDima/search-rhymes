import { Anchor, Group, Stack } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

import { splitArray } from "@/lib/utils";
import { ListType } from "@/providers/list-type-provider";
import type { Word } from "@/types/word";

export type WordsListProps = {
  words: Word[];
  type?: ListType;
};

export const WordsList: FC<WordsListProps> = ({ words, type = "horizontal" }) => {
  return (
    <>
      {type === "vertical" ? (
        <VerticalWordsList words={words} />
      ) : (
        <HorizontalWordsList words={words} />
      )}
    </>
  );
};

type HorizontalWordsListProps = {
  words: Word[];
};

const HorizontalWordsList: FC<HorizontalWordsListProps> = ({ words }) => {
  return (
    <Group gap="sm">
      {words.map((word) => (
        <Word word={word} key={word.word} />
      ))}
    </Group>
  );
};

type VerticalWordsListProps = {
  columns?: number;
  words: Word[];
};

const VerticalWordsList: FC<VerticalWordsListProps> = ({ words, columns = 5 }) => {
  const chunks = splitArray(words, columns);
  return (
    <Group
      justify={
        chunks.length > 2 ? "space-between" : chunks.length === 2 ? "space-around" : "center"
      }
    >
      {chunks.map((chunk, index) => (
        <Stack gap="sm" key={index}>
          {chunk.map((word) => (
            <Word word={word} key={word.word} />
          ))}
        </Stack>
      ))}
    </Group>
  );
};

const Word: FC<{ word: Word }> = ({ word }) => {
  return (
    <Anchor component={Link} href={`/rhymes/${word.word}`}>
      {word.word}
    </Anchor>
  );
};
