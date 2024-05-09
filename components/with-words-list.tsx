"use client";

import { FC } from "react";

import { WordsList } from "@/components/word-list";
import { ListType, useListType } from "@/providers/list-type-provider";

export type WithWordsListProps = {
  words: string[];
  type?: ListType;
};

export const WithWordsList: FC<WithWordsListProps> = ({ words, type }) => {
  const listTypeContext = useListType();
  const listType = type ? type : listTypeContext?.type ?? "horizontal";
  return <WordsList words={words} type={listType} />;
};
