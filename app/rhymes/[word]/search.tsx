"use client";
import { Anchor, CloseButton, Group, InputBase, Pill, Stack, Text } from "@mantine/core";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

import {
  FilterButton,
  POSSIBLE_GENDERS,
  POSSIBLE_PARTS_OF_SPEECH,
} from "@/app/rhymes/[word]/filter-button";
import { WordSearch } from "@/features/word-search";

export const Search: FC<{ word: string }> = ({ word }) => {
  const searchParams = useSearchParams();
  const genders = searchParams.getAll("genders") ?? [];
  const partsOfSpeech = searchParams.getAll("partsOfSpeech") ?? [];
  const pathname = usePathname();

  const removeGenders = (gendersToRemove: string[]) => {
    return genders.filter((gender) => !gendersToRemove.includes(gender));
  };

  const onRemoveGenders = (gendersToRemove: string[]) => {
    updateSearchParams({ genders: removeGenders(gendersToRemove), partsOfSpeech });
  };

  const removePartsOfSpeech = (partsOfSpeechToRemove: string[]) => {
    return partsOfSpeech.filter((partOfSpeech) => !partsOfSpeechToRemove.includes(partOfSpeech));
  };

  const onRemovePartsOfSpeech = (partsOfSpeechToRemove: string[]) => {
    updateSearchParams({ partsOfSpeech: removePartsOfSpeech(partsOfSpeechToRemove), genders });
  };

  const updateSearchParams = ({
    genders,
    partsOfSpeech,
  }: {
    genders: string[];
    partsOfSpeech: string[];
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("partsOfSpeech");
    params.delete("genders");
    partsOfSpeech.forEach((partOfSpeech) => params.append("partsOfSpeech", partOfSpeech));
    genders.forEach((gender) => params.append("genders", gender));
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  return (
    <Stack gap="md">
      <Group gap="md" wrap="nowrap">
        <WordSearch defaultValue={word} />
        <FilterButton />
      </Group>
      {(genders.length > 0 || partsOfSpeech.length > 0) && (
        <Group align="center" visibleFrom="sm">
          <Text>Фільтри</Text>
          {genders.length > 0 && (
            <InputBase
              // label="Рід"
              component="div"
              rightSection={<CloseButton onClick={() => onRemoveGenders(genders)} />}
            >
              {genders.map((gender) => {
                return (
                  <Pill
                    key={gender}
                    withRemoveButton={true}
                    onRemove={() => onRemoveGenders([gender])}
                  >
                    {POSSIBLE_GENDERS.find((item) => item.value === gender)?.value ?? "unknown"}
                  </Pill>
                );
              })}
            </InputBase>
          )}
          {partsOfSpeech.length > 0 && (
            <InputBase
              component="div"
              // label="Частина мови"
              rightSection={<CloseButton onClick={() => onRemovePartsOfSpeech(partsOfSpeech)} />}
            >
              {partsOfSpeech.map((partOfSpeech) => {
                return (
                  <Pill
                    key={partOfSpeech}
                    withRemoveButton={true}
                    onRemove={() => onRemovePartsOfSpeech([partOfSpeech])}
                  >
                    {POSSIBLE_PARTS_OF_SPEECH.find((item) => item.value === partOfSpeech)?.value ??
                      "unknown"}
                  </Pill>
                );
              })}
            </InputBase>
          )}
          <Anchor
            component="span"
            onClick={() => {
              updateSearchParams({
                genders: removeGenders(genders),
                partsOfSpeech: removePartsOfSpeech(partsOfSpeech),
              });
            }}
          >
            Очистити
          </Anchor>
        </Group>
      )}
    </Stack>
  );
};
