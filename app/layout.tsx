import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import "@mantine/core/styles.css";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const theme = createTheme({});

export const metadata: Metadata = {
  title: "Search for a rhyme",
};

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Search rhymes</title>

        <ColorSchemeScript />
      </head>
      <body className={cn("font-sans", fontSans.variable)}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
