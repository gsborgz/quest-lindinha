'use client'

import { useContext, useEffect, useState } from 'react';
import { DictionaryContext } from '@/contexts/dictionary.context';
import { SessionContext } from '@/contexts/session.context';
import en from '@/assets/i18n/en';
import ptBr from '@/assets/i18n/pt-br';

export default function DictionaryProvider({ children }: { children: React.ReactNode }) {
  const { user } = useContext(SessionContext);
  
  function locale(keyPath: string, args?: Record<string, any>): string {
    const language = user?.language || 'en';
    const [fileName, property, subProperty] = keyPath.split('.');
    const languageFile: Record<string, any> = language === 'pt-br' ? ptBr : en;
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