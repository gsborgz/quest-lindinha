'use client'

import { MoonIcon, SunIcon, ShoppingBagIcon, HomeIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/contexts/menu.context';
import { SidebarButtonProps, SidebarItem, SidebarLinkProps } from '@/types/components/menu.type';
import { SessionContext } from '@/contexts/session.context';
import { DictionaryContext } from '@/contexts/dictionary.context';
import { UserTheme } from '@/types/models/user.type';

export default function Sidebar() {
  const { locale } = useContext(DictionaryContext);
  const { menuActive } = useContext(MenuContext);
  const { user, signout } = useContext(SessionContext);
  const [mounted, setMounted] = useState(false);
  const homeIcon = <HomeIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const shoppingBagIcon = <ShoppingBagIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const logoutIcon = <ArrowLeftOnRectangleIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />
  const sidebarItems: SidebarItem[] = [
    { label: locale('text.home'), to: '/dashboard', icon: homeIcon, menuActive },
    { label: locale('text.shop'), to: '/shop', icon: shoppingBagIcon, menuActive },
    { label: locale('text.signout'), arialLabel: 'Logout', action: signout, icon: logoutIcon, menuActive }
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted || !user) {
    return null
  }

  return (
    <aside className='border-r min-h-[93%] fixed left-0 top-[7%] z-30 bg-neutral-50 dark:bg-slate-900 border-neutral-200 dark:border-slate-700'>
      <ul className='flex flex-col justify-between'>
        <div>
          { sidebarItems.map((item, index) => {
            if (item.to) {
              return (
                <li key={ index }>
                  <SidebarLink
                    label={ item.label }
                    to={ item.to }
                    icon={ item.icon }
                    menuActive={ item.menuActive }
                  />
                </li>
              )
            } else {
              return (
                <li key={ index }>
                  <SidebarButton
                    label={ item.label }
                    aria-label={ item.arialLabel }
                    icon={ item.icon }
                    action={ () => item.action ? item.action() : null }
                    menuActive={ item.menuActive }
                  />
                </li>
              )
            }
          }) }
        </div>
      </ul>
    </aside>
  );
}

function SidebarLink(props: SidebarLinkProps) {
  return (
    <Link
      href={ props.to }
      className='flex items-center justify-start transition-colors hover:bg-neutral-200 dark:hover:bg-zinc-700 px-5 py-5'
    >
      <div className='flex h-5 items-center'>
        { props.icon }

        { props.menuActive ? <span className='ml-3 font-bold text-slate-700 dark:text-neutral-50'>{ props.label }</span> : null }
      </div>
    </Link>
  )
}

function SidebarButton(props: SidebarButtonProps) {
  return (
    <button
      aria-label={ props.ariaLabel }
      type='button'
      className='flex items-center justify-start transition-colors hover:bg-neutral-200 dark:hover:bg-zinc-700 px-5 py-5 w-full'
      onClick={ props.action }
    >
      <div className='flex h-5 items-center'>
        { props.icon }

        { props.menuActive ? <span className='ml-3 font-bold text-slate-700 dark:text-neutral-50'>{ props.label }</span> : null }
      </div>
    </button>
  );
}