'use client'

import React, { use, useContext, useEffect } from 'react';
import Avatar from '@/components/avatar.component';
import { Bars3Icon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { MenuContext } from '@/contexts/menu.context';
import { SessionContext } from '@/contexts/session.context';
import { CreateRewardButton } from '@/components/create-reward-button.component';
import { CreateQuestButton } from '@/components/create-quest-button.component';
import { useTheme } from 'next-themes';

export default function Header() {
  const [mounted, setMounted] = React.useState(false);
  const { user } = useContext(SessionContext);
  const { toggleMenu } = useContext(MenuContext);
  const { resolvedTheme, setTheme } = useTheme();
  const sunIcon = <SunIcon className='h-5 w-5 text-neutral-50' />;
  const moonIcon = <MoonIcon className='h-5 w-5 text-slate-700' />;
  const isDarkTheme = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const loggedBarContent = (
    <nav className='w-full grid grid-cols-2 items-center'>
      <div className='flex items-center justify-start'>
        <button
          aria-label='Expand menu'
          type='button'
          className='flex items-center justify-center rounded-lg transition-colors p-2 mx-3 hover:bg-neutral-200 dark:hover:bg-zinc-700'
          onClick={ toggleMenu }
        >
          <Bars3Icon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />
        </button>

        <div className='flex items-center justify-start gap-4'>
          <CreateQuestButton />

          <CreateRewardButton />
        </div>
      </div>

      <div className='flex items-center justify-end px-4 py-3'>
        <Avatar />
      </div>
    </nav>
  );

  const notLoggedBarContent = (
    <nav className='w-full grid grid-cols-2 items-center'>
      <div className='flex items-center justify-start'>
        <button
          aria-label='Change Theme'
          type='button'
          className='flex items-center justify-center rounded-lg p-2 mx-3 hover:bg-neutral-200 dark:hover:bg-zinc-700 py-[0.65rem] px-2'
          onClick={ () => setTheme(isDarkTheme ? 'light' : 'dark') }
        >
          { isDarkTheme ? sunIcon : moonIcon }
        </button>
      </div>

      <div className='flex items-center justify-end px-4 py-3'></div>
    </nav>
  );

  return (
    <header className='sticky flex items-center top-0 z-30 w-full h-[7%] !p-0 sm:px-4 border-b bg-neutral-50 dark:bg-slate-900 border-neutral-200 dark:border-slate-700'>
      { user ? loggedBarContent : notLoggedBarContent }
    </header>
  );
}