'use client'

import { ThemeProvider } from 'next-themes';
import ModalProvider from '@/providers/modal.provider';
import SessionProvider from '@/providers/session.provider';
import SnackbarProvider from '@/providers/snackbar.provider';
import DictionaryProvider from '@/providers/dictionary.provider';

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <DictionaryProvider>
          <SnackbarProvider>
            <ModalProvider>
              { children }
            </ModalProvider>
          </SnackbarProvider>
        </DictionaryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
