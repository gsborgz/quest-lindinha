import { SignInData, SignUpData } from '@/types/auth.type';
import { User } from '@/types/user.type';

export type SessionData = {
  isSignedIn: boolean;
  signin: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signout: () => Promise<void>;
  me: User | null;
  loadQuests: boolean;
  loadRewards: boolean;
  toggleLoadQuests: () => void;
  toggleLoadRewards: () => void;
}
