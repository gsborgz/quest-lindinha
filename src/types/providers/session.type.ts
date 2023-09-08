import { SignInData, SignUpData } from '@/types/models/auth.type';
import { User } from '@/types/models/user.type';

export type SessionData = {
  signin: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signout: () => Promise<void>;
  user: User | null;
  loadQuests: boolean;
  loadRewards: boolean;
  setLoadRewards: (value: boolean) => void;
  setLoadQuests: (value: boolean) => void;
}
