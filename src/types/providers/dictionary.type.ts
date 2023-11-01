import { GenericObject } from '@/types/base.type';

export type LocaleFunction = (keyPath: string, args?: GenericObject) => string;

export type DictionaryData = {
  locale: LocaleFunction;
}
