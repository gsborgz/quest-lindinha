import { createContext } from 'react';
import { SnackbarData } from '@/types/components/snackbar.type';

export const SnackbarContext = createContext({} as SnackbarData);
