'use client'

import { useContext } from 'react';
import { AuthContext } from '@contexts/auth.context';

export default function Main({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <main className={ `${isSignedIn ? 'min-h-[93%]' : 'h-full' } w-full flex flex-row bg-blue-50 dark:bg-slate-800` }>
      <section className='w-full container p-5 text-slate-700 dark:text-neutral-50'>
        { children }
      </section>
    </main>
  );
}
