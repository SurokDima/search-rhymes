import { Box, Stack, Title } from "@mantine/core";
import { FC } from "react";

import { WordsList } from "@/components/word-list";
import { Word } from "@/types/word";

export type PopularWordsProps = {
  words: string[];
};

export const PopularWords: FC<{ words: Word[] }> = ({ words }) => {
  return (
    <section>
      <Stack gap={5}>
        <Title order={2}>Popular words</Title>
        <Box px="md">
          <WordsList words={words} />
        </Box>
      </Stack>
    </section>
  );
};
