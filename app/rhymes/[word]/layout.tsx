import { Anchor, AppShell, AppShellHeader, AppShellMain, Group, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";

import { Search } from "@/app/rhymes/[word]/search";
import { ThemeButton } from "@/components/theme-button";
import { WithListTypeSwitcher } from "@/components/with-list-type-swithcer";
import { ListTypeProvider } from "@/providers/list-type-provider";
import { ActionToolbar, ActionToolbarProvider } from "@/providers/toolbar-action-provider";

import styles from "./layout.module.scss";

export default function RhymesLayout({
  params: { word: rawWord },
  children,
}: {
  params: { word: string };
  children: React.ReactNode;
}) {
  const word = decodeURIComponent(rawWord);

  return (
    <ActionToolbarProvider>
      <ListTypeProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { desktop: true },
          }}
          aside={{ width: 250, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
          padding="md"
        >
          {/* <AppShellHeader>
                <Group h="100%" px="md">
                  <Link href="/" className={styles.logo}>
                    SearchRhymes
                  </Link>
                  <Group justify="flex-end" style={{ flex: 1 }}>
                    <Group ml="xl" gap="md">
                      <ActionIcon
                        variant="default"
                        color="gray"
                        size="input-sm"
                        aria-label="toggle search"
                        hiddenFrom="sm"
                      >
                        <IconSearch />
                      </ActionIcon>
                      <ThemeButton />
                    </Group>
                  </Group>
                </Group>
              </AppShellHeader> */}

          <AppShellMain>
            <Group justify="center" pt="lg">
              <Stack gap="lg" w="100%" maw={600}>
                <Suspense>
                  <Search word={word} />
                </Suspense>

                {/* <div>
              <Spoiler showLabel="Advanced" hideLabel="Close" initialState={true}>
                <Group gap="md" wrap="nowrap">
                  <Stack gap="sm">
                    <Text>Рід</Text>
                    <Checkbox label="Чоловічі" defaultChecked />
                    <Checkbox label="Жіночі" defaultChecked />
                  </Stack>
                  <Stack gap="sm">
                    <Text>Частина мови</Text>
                    <Checkbox label="Іменник" defaultChecked />
                    <Checkbox label="Прикметник" defaultChecked />
                    <Checkbox label="Дієслово" defaultChecked />
                  </Stack>
                  <MultiSelect
                    label="Your favorite libraries"
                    placeholder="Pick value"
                    defaultValue={["Іменник", "Прикметник", "Дієслово"]}
                    data={["Іменник", "Прикметник", "Дієслово"]}
                  />
                </Group>
              </Spoiler>
            </div> */}
                <Group justify="space-between">
                  <Title id="Рими" order={1} data-heading="Рими" data-order="1">
                    Рими з{" "}
                    <Anchor
                      underline="hover"
                      component={Link}
                      className={styles.word}
                      href={`/rhymes/${word}`}
                    >
                      {word}
                    </Anchor>
                  </Title>
                  <WithListTypeSwitcher />
                </Group>
                <Stack maw={600} w="100%">
                  {children}
                </Stack>
              </Stack>
            </Group>
          </AppShellMain>
          <AppShellHeader>
            <Group h="100%" px="md" gap="md" justify="space-between">
              <Link href="/" className={styles.logo}>
                SearchRhymes
              </Link>
              <ActionToolbar />
              <Group gap="lg">
                <ThemeButton />
              </Group>
            </Group>
          </AppShellHeader>
        </AppShell>
      </ListTypeProvider>
    </ActionToolbarProvider>
  );
}
