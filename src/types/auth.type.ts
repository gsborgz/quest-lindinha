export type AuthData = {
  isSignedIn: boolean;
  signin: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signout: () => Promise<void>;
}

export class SigninResult {

  public token: string;

}

export class SignInData {

  public email: string;
  public password: string;
  public expires_in: number;

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
