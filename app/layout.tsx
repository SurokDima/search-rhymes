"use client";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { TableOfContentsProvider } from "@/providers/table-of-contents-provider";

import "@mantine/core/styles.css";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const theme = createTheme({});

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Search rhymes</title>

        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={cn("font-sans", fontSans.variable)}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <TableOfContentsProvider>
            {children}
            {/* <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: true },
              }}
              aside={{ width: 250, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
              padding="md"
            >
              <AppShellHeader>
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
              </AppShellHeader>

              <AppShellMain>{children}</AppShellMain>
            </AppShell> */}
          </TableOfContentsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
