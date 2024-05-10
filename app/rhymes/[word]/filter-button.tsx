"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
} from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CheckboxMultiselectFormField } from "@/components/ui/checkbox-multiselect";

type FormData = {
  genders: string[];
  partsOfSpeech: string[];
};

export const POSSIBLE_GENDERS = [
  {
    label: "Чоловічі",
    value: "man",
  },
  {
    label: "Жіночі",
    value: "woman",
  },
] as const;

export const POSSIBLE_PARTS_OF_SPEECH = [
  {
    label: "Іменник",
    value: "noun",
  },
  {
    label: "Дієслово",
    value: "verb",
  },
  {
    label: "Прикметник",
    value: "adjective",
  },
];

const validationSchema = z.object({
  genders: z.array(z.string()).min(1, "Оберіть хоча б один рід"),
  partsOfSpeech: z.array(z.string()).min(1, "Оберіть хоча б одну частину мови"),
});

export const FilterButton: FC = () => {
  const [isOpen, setIsOpened] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchParamsGenders = searchParams.getAll("genders");

  const defaultGenders =
    searchParamsGenders.length === 0
      ? POSSIBLE_GENDERS.map((item) => item.value)
      : searchParamsGenders;

  const searchParamsPartsOfSpeech = searchParams.getAll("partsOfSpeech");

  const defaultPartsOfSpeech =
    searchParamsPartsOfSpeech.length === 0
      ? POSSIBLE_PARTS_OF_SPEECH.map((item) => item.value)
      : searchParamsPartsOfSpeech;

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit: onSubmit,
  } = useForm<FormData>({
    defaultValues: {
      genders: defaultGenders,
      partsOfSpeech: defaultPartsOfSpeech,
    },
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    const searchParamsGenders = searchParams.getAll("genders");

    const defaultGenders =
      searchParamsGenders.length === 0
        ? POSSIBLE_GENDERS.map((item) => item.value)
        : searchParamsGenders;

    const searchParamsPartsOfSpeech = searchParams.getAll("partsOfSpeech");

    const defaultPartsOfSpeech =
      searchParamsPartsOfSpeech.length === 0
        ? POSSIBLE_PARTS_OF_SPEECH.map((item) => item.value)
        : searchParamsPartsOfSpeech;
    reset({
      genders: defaultGenders,
      partsOfSpeech: defaultPartsOfSpeech,
    });
  }, [reset, searchParams]);

  const handleSubmit = ({ genders, partsOfSpeech }: FormData) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("genders")) params.delete("genders");

    genders.forEach((gender) => {
      params.append("genders", gender);
    });

    if (params.has("partsOfSpeech")) params.delete("partsOfSpeech");

    partsOfSpeech.forEach((partOfSpeech) => {
      params.append("partsOfSpeech", partOfSpeech);
    });

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    setIsOpened(false);
  };

  return (
    <Popover opened={isOpen} onChange={setIsOpened} position="bottom" withArrow shadow="md">
      <PopoverTarget>
        <ActionIcon aria-label="filter" size="input-sm" onClick={() => setIsOpened((o) => !o)}>
          <IconFilter />
        </ActionIcon>
      </PopoverTarget>
      <PopoverDropdown>
        <Stack gap="md">
          <Group gap="md" wrap="nowrap" align="flex-start">
            <CheckboxMultiselectFormField
              name="genders"
              control={control}
              items={POSSIBLE_GENDERS}
              errors={errors}
              label="Рід"
            />
            <Divider orientation="vertical" />
            <CheckboxMultiselectFormField
              name="partsOfSpeech"
              control={control}
              errors={errors}
              items={POSSIBLE_PARTS_OF_SPEECH}
              label="Частини мови"
            />
          </Group>
          <Group gap="lg">
            <Button
              variant="outline"
              color="gray"
              onClick={() => {
                setIsOpened(false);
                reset({
                  genders: defaultGenders,
                  partsOfSpeech: defaultPartsOfSpeech,
                });
              }}
            >
              Відмінити
            </Button>
            <Button onClick={onSubmit(handleSubmit)}>Застосувати</Button>
          </Group>
        </Stack>
      </PopoverDropdown>
    </Popover>
  );
};
