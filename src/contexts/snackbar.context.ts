import { createContext } from 'react';
import { SnackbarData } from '@/types/snackbar.type';

export const SnackbarContext = createContext({} as SnackbarData);
