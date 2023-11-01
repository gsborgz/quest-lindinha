import { BaseMessage } from '@/types/base.type';
import { PasswordResetRequestData, SignInData, SignInResult, SignUpData } from '@/types/models/auth.type';
import { User, UserLanguage } from '@/types/models/user.type';

export type AuthServiceData = {
  me: () => Promise<User>;
  signin: (data: SignInData) => Promise<SignInResult>;
  signup: (data: SignUpData) => Promise<SignInResult>;
  requestPasswordReset: (data: PasswordResetRequestData) => Promise<BaseMessage>;
  signout: () => Promise<BaseMessage>;
  setLanguage: (language: UserLanguage) => Promise<BaseMessage>;
  setTheme: (theme: string) => Promise<BaseMessage>;
}
