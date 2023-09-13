import { createContext } from 'react';
import { DictionaryData } from '@/types/providers/dictionary.type';

export const DictionaryContext = createContext({} as DictionaryData);