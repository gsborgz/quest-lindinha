import { createContext } from 'react';
import { AuthData } from '@/types/auth.type';

export const AuthContext = createContext({} as AuthData);
