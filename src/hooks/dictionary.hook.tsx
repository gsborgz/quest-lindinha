'use client'

import { useContext } from 'react';
import en from '@src/assets/i18n/en';
import ptBr from '@src/assets/i18n/pt-br';
import { UserLanguage } from '@src/types/models/user.type';
import { GenericObject } from '@src/types/base.type';
import { SessionContext } from '@src/providers/session.provider';

export type LocaleFunction = (keyPath: string, args?: GenericObject) => string;

export type DictionaryData = {
  locale: LocaleFunction;
}

export function useDictionary(): DictionaryData {
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

  return { locale };
}