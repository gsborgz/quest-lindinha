'use client'

import { useContext } from 'react';
import Snackbar from '@src/components/snackbar.component';
import { SnackbarContext } from '@src/providers/snackbar.provider';

export default function SnackbarContainer() {
  const { open, message, type } = useContext(SnackbarContext);

  if (!open) {
    return null;
  }

  return (
    <section className='container fixed z-30 flex items-end justify-center w-full bottom-3'>
      <Snackbar message={ message } type={ type } />
    </section>
  );
}
