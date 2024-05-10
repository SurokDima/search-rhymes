"use client";

import { MantineSize } from "@mantine/core";
import { FC, useRef } from "react";

import { rhymesApi } from "@/api";
import { AsyncAutocomplete } from "@/components/ui/async-autocomplete";

export type WordPickerProps = {
  onChange?: (value: string) => void;
  defaultValue?: string;
  size?: MantineSize;
};

export const WordPicker: FC<WordPickerProps> = ({ onChange, defaultValue, size }) => {
  const abortController = useRef<AbortController | null>(null);

  const fetchOptions = async (query: string) => {
    abortController.current?.abort();
    abortController.current = new AbortController();

    const result = await rhymesApi.searchWords(query);
    abortController.current = null;
    return result.map((word) => word.word);
  };

  return (
    <div>
      <AsyncAutocomplete
        defaultValue={defaultValue}
        onChange={onChange}
        fetchOptions={fetchOptions}
        selectFirstOption
        size={size}
        placeholder="Search word"
      />
    </div>
  );
};
