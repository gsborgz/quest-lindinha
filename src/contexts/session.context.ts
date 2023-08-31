import { createContext } from 'react';
import { SessionData } from '@/types/session.type';

export const SessionContext = createContext({} as SessionData);
