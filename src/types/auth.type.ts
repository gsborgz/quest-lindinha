export type AuthData = {
  isSignedIn: boolean;
  signIn: (data: SignInData) => void;
  signUp: (data: SignUpData) => void;
  signOut: () => void;
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
