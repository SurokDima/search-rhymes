"use client";

import {
  AppShell,
  AppShellAside,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { FC, ReactNode } from "react";

import { ThemeButton } from "@/components/theme-button";

import styles from "./main-layout.module.scss";

export const MainLayout: FC<{ children: React.ReactNode; aside?: ReactNode }> = ({
  children,
  aside,
}) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link href="/" className={styles.logo}>
            SearchRhymes
          </Link>
          <Group justify="flex-end" style={{ flex: 1 }}>
            <Group ml="xl" gap="md">
              {/* <WordSearch size="sm" /> */}
              <ThemeButton />
            </Group>
          </Group>
        </Group>
      </AppShellHeader>

      <AppShellNavbar py="md" px={4}>
        <UnstyledButton>Home</UnstyledButton>
        <UnstyledButton>Blog</UnstyledButton>
        <UnstyledButton>Contacts</UnstyledButton>
        <UnstyledButton>Support</UnstyledButton>
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>

      {aside && (
        <AppShellAside p="md" w={250}>
          {aside}
        </AppShellAside>
      )}
    </AppShell>
  );
};
