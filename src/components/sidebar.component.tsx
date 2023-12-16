'use client'

import { ShoppingBagIcon, HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { SidebarButtonProps, SidebarItem, SidebarLinkProps } from '@src/types/components/menu.type';
import { MenuContext } from '@src/providers/menu.provider';
import { SessionContext } from '@src/providers/session.provider';
import { useDictionary } from '../hooks/dictionary.hook';

export default function Sidebar() {
  const { locale } = useDictionary();
  const { menuActive } = useContext(MenuContext);
  const { user } = useContext(SessionContext);
  const [mounted, setMounted] = useState(false);
  const homeIcon = <HomeIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const shoppingBagIcon = <ShoppingBagIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const sidebarItems: SidebarItem[] = [
    { label: locale('text.home'), to: '/dashboard', icon: homeIcon, menuActive },
    { label: locale('text.shop'), to: '/shop', icon: shoppingBagIcon, menuActive }
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