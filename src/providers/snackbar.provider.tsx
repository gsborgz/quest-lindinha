import { useState } from 'react';
import { SnackbarType } from '@src/types/components/snackbar.type';
import { createContext } from 'react';
import { SnackbarData } from '@src/types/components/snackbar.type';

export const SnackbarContext = createContext({} as SnackbarData);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<SnackbarType>(SnackbarType.INFO);

  function openSnackbar(message: string, type: SnackbarType, duration?: number) {
    setMessage(message);
    setType(type);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, duration || 3000);
  }

  return (
    <SnackbarContext.Provider value={{ openSnackbar, message, open, type }}>
      { children }
    </SnackbarContext.Provider>
  );
}