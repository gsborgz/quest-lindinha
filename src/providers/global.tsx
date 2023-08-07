'use client'

import { ThemeProvider } from "next-themes";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      { children }
    </ThemeProvider>
  );
}
