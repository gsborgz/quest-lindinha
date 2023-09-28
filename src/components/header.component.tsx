'use client'

import React, { Fragment, useContext, useEffect } from 'react';
import Avatar from '@/components/avatar.component';
import { Bars3Icon, MoonIcon, SunIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { MenuContext } from '@/contexts/menu.context';
import { SessionContext } from '@/contexts/session.context';
import { CreateRewardButton } from '@/components/create-reward-button.component';
import { CreateQuestButton } from '@/components/create-quest-button.component';
import { UserLanguage, UserTheme } from '@/types/models/user.type';
import { Menu, Transition } from '@headlessui/react';
import { US, BR } from 'country-flag-icons/react/3x2'

export default function Header() {
  const [mounted, setMounted] = React.useState(false);
  const { user, theme, changeTheme, changeLanguage } = useContext(SessionContext);
  const { toggleMenu } = useContext(MenuContext);
  const sunIcon = <SunIcon className='h-5 w-5 text-neutral-50' />;
  const moonIcon = <MoonIcon className='h-5 w-5 text-slate-700' />;
  const isDarkTheme = theme === UserTheme.DARK;

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
      <div className='flex items-center justify-start gap-2 px-4 py-3'></div>
      <div className='flex items-center justify-end gap-2 px-4 py-3'>
        <button
          aria-label='Change Theme'
          type='button'
          className='flex items-center justify-center rounded-lg p-2 hover:bg-neutral-200 dark:hover:bg-zinc-700'
          onClick={ () => changeTheme(isDarkTheme ? UserTheme.LIGHT : UserTheme.DARK) }
        >
          { isDarkTheme ? sunIcon : moonIcon }
        </button>

        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='flex items-center justify-center rounded-lg p-2 hover:bg-neutral-200 dark:hover:bg-zinc-700'>
            <GlobeAltIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='flex items-center justify-center gap-1 absolute right-0 p-2 z-10 mt-2 origin-top-right rounded-md bg-slate-100 dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <button
                title='Português (BR)'
                aria-label='Change Theme'
                type='button'
                className='flex items-center justify-center rounded-lg px-2 py-1 hover:bg-neutral-200 dark:hover:bg-zinc-600'
                onClick={ () => changeLanguage(UserLanguage.PTBR) }
              >
                <BR className='w-6 h-6' />
              </button>

              <button
                title='English (US)'
                aria-label='Change Theme'
                type='button'
                className='flex items-center justify-center rounded-lg px-2 py-1 hover:bg-neutral-200 dark:hover:bg-zinc-600'
                onClick={ () => changeLanguage(UserLanguage.EN) }
              >
                <US className='w-6 h-6' />
              </button>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );

  return (
    <header className='sticky flex items-center top-0 z-30 w-full h-[7%] !p-0 sm:px-4 border-b bg-neutral-50 dark:bg-slate-900 border-neutral-200 dark:border-slate-700'>
      { user ? loggedBarContent : notLoggedBarContent }
    </header>
  );
}