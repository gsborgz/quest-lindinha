'use client'

import { ThemeProvider } from 'next-themes';
import { ModalProvider } from '@src/providers/modal.provider';
import { SessionProvider } from '@src/providers/session.provider';
import { SnackbarProvider } from '@src/providers/snackbar.provider';

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>
        <SnackbarProvider>
          <ModalProvider>
            { children }
          </ModalProvider>
        </SnackbarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
