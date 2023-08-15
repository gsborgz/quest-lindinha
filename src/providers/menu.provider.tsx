'use client'

import { useState } from 'react';
import { MenuContext } from '@/contexts/menu.context';

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