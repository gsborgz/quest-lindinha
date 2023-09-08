import { createContext } from 'react';
import { SessionData } from '@/types/providers/session.type';

export const SessionContext = createContext({} as SessionData);
