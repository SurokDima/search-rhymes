"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { FC } from "react";

export const ThemeButton: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      color="gray"
      size="input-sm"
      aria-label="toggle theme"
    >
      {colorScheme === "light" ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
};
