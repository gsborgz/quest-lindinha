'use client'

import { ThemeProvider } from 'next-themes';
import { ModalProvider } from '@/providers/modal.provider';
import { SessionProvider } from '@/providers/session.provider';
import { SnackbarProvider } from '@/providers/snackbar.provider';
import { DictionaryProvider } from '@/providers/dictionary.provider';
import ServicesProvider from '@/providers/services.provider';

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <DictionaryProvider>
        <SnackbarProvider>
          <ServicesProvider>
            <SessionProvider>
              <ModalProvider>
                { children }
              </ModalProvider>
            </SessionProvider>
          </ServicesProvider>
        </SnackbarProvider>
      </DictionaryProvider>
    </ThemeProvider>
  );
}
