import { SnackbarContext } from '@/contexts/snackbar.context';
import { useState } from 'react';
import { SnackbarType } from '@/types/components/snackbar.type';

export default function SnackbarProvider({ children }: { children: React.ReactNode }) {
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