import { FC } from "react";

import { StressedWord } from "@/types/word";

export type StressedWordTextProps = {
  stressedWord: StressedWord;
};

export const StressedWordText: FC<StressedWordTextProps> = ({ stressedWord }) => {
  return (
    <>
      {Array.from(stressedWord.word)
        .map((letter, index) =>
          stressedWord.currentStressPosition === index ? vowelsMap[letter] : letter
        )
        .join("")}
    </>
  );
};

const vowelsMap: Record<string, string> = {
  а: "а́",
  е: "е́",
  и: "и́",
  і: "і́",
  о: "о́",
  у: "у́",
  ю: "ю́",
  я: "я́",
  А: "А́",
  Е: "Е́",
  И: "И́",
  І: "І́",
  О: "О́",
  У: "У́",
  Ю: "Ю́",
  Я: "Я́",
};
