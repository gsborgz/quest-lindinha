import { GenericObject } from '@/types/base.type';

export type DictionaryData = {
  locale: (keyPath: string, args?: GenericObject) => string;
}
