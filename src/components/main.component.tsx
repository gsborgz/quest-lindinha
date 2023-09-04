'use client'

import { useContext } from 'react';
import { SessionContext } from '@/contexts/session.context';

export default function Main({ children }: { children: React.ReactNode }) {
  const { user } = useContext(SessionContext);

  return (
    <main className={ `${user ? 'min-h-[93%]' : 'h-full' } w-full flex flex-row bg-blue-50 dark:bg-slate-800` }>
      <section className='w-full container p-5 text-slate-700 dark:text-neutral-50'>
        { children }
      </section>
    </main>
  );
}
