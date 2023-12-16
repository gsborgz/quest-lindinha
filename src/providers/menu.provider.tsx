'use client'

import { useState } from 'react';
import { createContext } from 'react';
import { MenuData } from '@src/types/components/menu.type';

export const MenuContext = createContext({} as MenuData);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuActive, setMenuActive] = useState(false);

  function toggleMenu() {
    setMenuActive(!menuActive);
  }

  return (
    <MenuContext.Provider value={{ menuActive, toggleMenu }}>
      { children }
    </MenuContext.Provider>
  );
}