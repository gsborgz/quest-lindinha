'use client'

import { ThemeProvider } from 'next-themes';
import ModalProvider from '@/providers/modal.provider';
import AuthProvider from '@/providers/auth.provider';
import SnackbarProvider from '@/providers/snackbar.provider';

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <SnackbarProvider>
          <ModalProvider>
            { children }
          </ModalProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
