'use client'

import { useContext } from 'react';
import { SnackbarContext } from '@/contexts/snackbar.context';
import Snackbar from '@/components/snackbar.component';

export default function SnackbarContainer() {
  const { open, message, type } = useContext(SnackbarContext);

  return (
    <section className='container fixed z-30 flex items-end justify-center h-[90%] w-full'>
      { open ? (
        <Snackbar message={ message } type={ type } />
      ) : null }
    </section>
  );
}
