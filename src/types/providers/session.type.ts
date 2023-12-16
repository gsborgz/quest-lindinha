import { SignInData, SignUpData } from '@src/types/models/auth.type';
import { User, UserLanguage, UserTheme } from '@src/types/models/user.type';

export type SessionData = {
  user: User | null;
  credits: number;
  avatar: string;
  loadQuests: boolean;
  loadRewards: boolean;
  language: UserLanguage;
  theme: UserTheme;
  signin: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signout: () => Promise<void>;
  setLoadRewards: (value: boolean) => void;
  setLoadQuests: (value: boolean) => void;
  setCredits: (value: number) => void;
  setAvatar: (value: string) => void;
  changeLanguage: (language: UserLanguage) => void;
  changeTheme: (theme: UserTheme) => void;
  addCredits: (credits: number) => void;
  removeCredits: (credits: number) => void;
}
