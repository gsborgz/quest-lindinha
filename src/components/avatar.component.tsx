'use client'

import { Menu, Transition } from '@headlessui/react';
import { BR, US } from 'country-flag-icons/react/3x2';
import Image from 'next/image';
import { Fragment, useContext } from 'react';
import { UserLanguage, UserTheme } from '@src/types/models/user.type';
import Divider from '@src/components/divider.component';
import { ArrowLeftOnRectangleIcon, MoonIcon, SunIcon, UserIcon } from '@heroicons/react/24/solid';
import { SessionContext } from '@src/providers/session.provider';
import { useDictionary } from '@src/hooks/dictionary.hook';
import Link from 'next/link';

export default function Avatar() {
  const { locale } = useDictionary();
  const { theme, avatar, changeTheme, changeLanguage, signout } = useContext(SessionContext);
  const isDarkTheme = theme === UserTheme.DARK;
  const sunIcon = <SunIcon className='col-auto h-4 w-4 text-neutral-50' />;
  const moonIcon = <MoonIcon className='col-auto h-4 w-4 text-slate-700' />;

  return (
    <Menu as='div' className='relative inline-block text-left select-none'>
      <Menu.Button className='flex items-center justify-center'>
        <Image
          src={ `/avatar/${avatar || 'avatar-1'}.jpg` }
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
        <Menu.Items className='flex flex-col items-center justify-start gap-2 w-32 absolute right-0 p-2 z-10 mt-2 origin-top-right rounded-md bg-slate-100 dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <Link
            href='/profile'
            className='flex w-full items-center transition-colors hover:bg-neutral-200 dark:hover:bg-zinc-600 p-2 rounded'
          >
            <div className='flex items-center gap-2'>
              <UserIcon className='col-auto h-4 w-4 text-slate-700 dark:text-neutral-50' />

              <span className='col-span-1 font-bold text-slate-700 dark:text-neutral-50'>{ locale('text.profile') }</span>
            </div>
          </Link>

          <button
            aria-label='Change Theme'
            type='button'
            className='flex w-full items-center transition-colors hover:bg-neutral-200 dark:hover:bg-zinc-600 p-2 rounded'
            onClick={ () => changeTheme(isDarkTheme ? UserTheme.LIGHT : UserTheme.DARK) }
          >
            <div className='flex items-center gap-2'>
              { isDarkTheme ? sunIcon : moonIcon }

              <span className='col-auto font-bold text-slate-700 dark:text-neutral-50'>{ locale('text.theme') }</span>
            </div>
          </button>

          <button
            aria-label='Logout'
            type='button'
            className='flex w-full items-center transition-colors hover:bg-neutral-200 dark:hover:bg-zinc-600 p-2 rounded'
            onClick={ signout }
          >
            <div className='flex items-center gap-2'>
              <ArrowLeftOnRectangleIcon className='col-auto h-4 w-4 text-slate-700 dark:text-neutral-50' />

              <span className='col-span-1 font-bold text-slate-700 dark:text-neutral-50'>{ locale('text.signout') }</span>
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