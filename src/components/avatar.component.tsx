'use client'

import { Menu, Transition } from '@headlessui/react';
import { BR, US } from 'country-flag-icons/react/3x2';
import Image from 'next/image';
import { Fragment, useContext } from 'react';
import { UserLanguage, UserTheme } from '@/types/models/user.type';
import Divider from '@/components/divider.component';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { SessionContext } from '@/providers/session.provider';
import { useDictionary } from '../hooks/dictionary.hook';

export default function Avatar() {
  const { locale } = useDictionary();
  const { theme, changeTheme, changeLanguage } = useContext(SessionContext);
  const isDarkTheme = theme === UserTheme.DARK;
  const sunIcon = <SunIcon className='h-5 w-5 text-neutral-50' />;
  const moonIcon = <MoonIcon className='h-5 w-5 text-slate-700' />;

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='flex items-center justify-center'>
        <Image
          src='/avatar/avatar-1.jpg'
          width={40}
          height={40}
          alt='Profile picture'
          className='rounded-full border-2 border-blue-600 dark:border-blue-500'
        />
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
        <Menu.Items className='flex flex-col items-center justify-start gap-2 absolute right-0 p-2 z-10 mt-2 origin-top-right rounded-md bg-slate-100 dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <button
            aria-label='Change Theme'
            type='button'
            className='flex items-center justify-center transition-colors hover:bg-neutral-200 dark:hover:bg-zinc-600 p-2 w-full rounded'
            onClick={ () => changeTheme(isDarkTheme ? UserTheme.LIGHT : UserTheme.DARK) }
          >
            <div className='flex h-5 items-center'>
              { isDarkTheme ? sunIcon : moonIcon }

              <span className='ml-3 font-bold text-slate-700 dark:text-neutral-50'>{ locale('text.theme') }</span>
            </div>
          </button>

          <Divider text={ locale('text.language') } />

          <div className='flex flex-row gap-2 items-center justify-center'>
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
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}