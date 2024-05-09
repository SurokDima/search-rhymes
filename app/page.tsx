import { Stack, Title } from "@mantine/core";

import { WordSearch } from "@/features/word-search";

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center pt-10">
      <Stack gap="md" className="flex flex-col">
        <Title order={1}>Знайти риму</Title>
        <WordSearch />
      </Stack>
    </div>
  );
}
