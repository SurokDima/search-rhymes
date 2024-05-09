"use client";

import { Box } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

import { WordPicker } from "@/components/word-picker";
import { useActionToolbar } from "@/providers/toolbar-action-provider";

export type WordSearchProps = {
  defaultValue?: string;
};

export const WordSearch: FC<WordSearchProps> = ({ defaultValue }) => {
  const router = useRouter();
  const { ref, inViewport } = useInViewport();
  const isSearchVisible = inViewport || ref.current === null;
  const { register, unregister } = useActionToolbar();

  const handleChange = (value: string) => {
    router.push(`/rhymes/${value}`);
  };

  useEffect(() => {
    if (!isSearchVisible) {
      register(() => (
        <Box flex="1 1 auto" maw={500}>
          <WordPicker onChange={handleChange} size={"sm"} defaultValue={defaultValue} />
        </Box>
      ));
    } else {
      unregister();
    }
  }, [isSearchVisible]);

  return (
    <div ref={ref} style={{ flex: "1 1 auto" }}>
      <div>
        <WordPicker onChange={handleChange} size={"sm"} defaultValue={defaultValue} />
      </div>
    </div>
  );
};
