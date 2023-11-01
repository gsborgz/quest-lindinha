'use client'

import { useContext } from 'react';
import en from '@/assets/i18n/en';
import ptBr from '@/assets/i18n/pt-br';
import { UserLanguage } from '@/types/models/user.type';
import { GenericObject } from '@/types/base.type';
import { createContext } from 'react';
import { DictionaryData } from '@/types/providers/dictionary.type';
import { SessionContext } from '@/providers/session.provider';

export const DictionaryContext = createContext({} as DictionaryData);

export function DictionaryProvider({ children }: { children: React.ReactNode }) {
  const { language } = useContext(SessionContext);

  function locale(keyPath: string, args?: GenericObject): string {
    const [fileName, property, subProperty] = keyPath.split('.');
    const languageFile: GenericObject = language === UserLanguage.PTBR ? ptBr : en;
    const file = languageFile[fileName];

    if (!file) {
      return '';
    }

    let value = file[property];

    if (!value) {
      return '';
    }

    if (subProperty) {
      value = value[subProperty];
    }

    if (!args) {
      return value;
    }

    Object.keys(args).forEach(key => {
      value = value.replace(`{${key}}`, args[key]);
    });

    return value;
  }

  return (
    <DictionaryContext.Provider value={{ locale }}>
      { children }
    </DictionaryContext.Provider>
  );
}