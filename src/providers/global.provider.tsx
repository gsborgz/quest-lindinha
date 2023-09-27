'use client'

import { ThemeProvider } from 'next-themes';
import ModalProvider from '@/providers/modal.provider';
import SessionProvider from '@/providers/session.provider';
import SnackbarProvider from '@/providers/snackbar.provider';
import DictionaryProvider from '@/providers/dictionary.provider';

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>
          <DictionaryProvider>
            <SnackbarProvider>
              <ModalProvider>
                { children }
              </ModalProvider>
            </SnackbarProvider>
          </DictionaryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
