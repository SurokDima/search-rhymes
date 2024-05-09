"use client";

import { MantineSize } from "@mantine/core";
import { FC, useRef } from "react";

import { AsyncAutocomplete } from "@/components/ui/async-autocomplete";

const MOCKDATA = [
  "Apples",
  "Bananas",
  "Broccoli",
  "Carrots",
  "Chocolate",
  "Grapes",
  "Lemon",
  "Lettuce",
  "Mushrooms",
  "Oranges",
  "Potatoes",
  "Tomatoes",
  "Eggs",
  "Milk",
  "Bread",
  "Chicken",
  "Hamburger",
  "Cheese",
  "Steak",
  "French Fries",
  "Pizza",
  "Cauliflower",
  "Peanuts",
  "Ice Cream",
  "Honey",
  "Baguette",
  "Sushi",
  "Kiwi",
  "Strawberries",
];

function getAsyncData(searchQuery: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new Error("Request aborted"));
    });

    setTimeout(() => {
      resolve(
        MOCKDATA.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())).slice(
          0,
          5
        )
      );
    }, Math.random() * 1000);
  });
}

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

    const result = await getAsyncData(query, abortController.current.signal);
    abortController.current = null;
    return result;
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
