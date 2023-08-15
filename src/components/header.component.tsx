'use client';

import React, { useContext } from 'react';
import Avatar from '@/components/avatar.component';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { MenuContext } from '@/contexts/menu.context';
import { AuthContext } from '@/contexts/auth.context';

export default function Header() {
  const { isSignedIn } = useContext(AuthContext);
  const { toggleMenu } = useContext(MenuContext);

  if (!isSignedIn) {
    return null;
  }

  return (
    <header className='sticky top-0 z-30 w-full min-h-[7%] !p-0 sm:px-4 border-b bg-neutral-50 dark:bg-slate-900 border-neutral-200 dark:border-slate-700'>
      <nav className='w-full flex flex-row items-center justify-between'>
        <div className='flex items-center justify-center'>
          <button
            aria-label='Expand menu'
            type='button'
            className='flex items-center justify-center rounded-lg transition-colors p-2 mx-3 hover:bg-neutral-200 dark:hover:bg-zinc-700'
            onClick={toggleMenu}
          >
            <Bars3Icon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />
          </button>
        </div>

        <div className='flex items-center justify-end px-4 py-3'>
          <Avatar />
        </div>
      </nav>
    </header>
  );
}
