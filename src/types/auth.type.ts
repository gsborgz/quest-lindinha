import { User } from '@/types/user.type';

export type AuthData = {
  isSignedIn: boolean;
  signin: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signout: () => Promise<void>;
  me: User | null;
}

export class SignInResult {

  public token: string;

}

export class SignInData {

  public email: string;
  public password: string;
  public expires_in: number;

  constructor(email: string, password: string, expires_in: number = 10000) {
    this.email = email;
    this.password = password;
    this.expires_in = expires_in;
  }

}

export class SignUpData {

  public name: string;
  public email: string;
  public password: string;
  public password_confirmation: string;
  public expires_in: number;

}

export class PasswordResetRequestData {

  public email: string;

}
