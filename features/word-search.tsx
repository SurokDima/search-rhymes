"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { WordPicker } from "@/components/word-picker";

export type WordSearchProps = {
  defaultValue?: string;
};

export const WordSearch: FC<WordSearchProps> = ({ defaultValue }) => {
  const router = useRouter();

  const handleChange = (value: string) => {
    router.push(`/rhymes/${value}`);
  };

  return (
    <div className="w-[500px]">
      <WordPicker onChange={handleChange} defaultValue={defaultValue} />
    </div>
  );
};
