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

  constructor(name: string, email: string, password: string, password_confirmation: string, expires_in: number = 10000) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.expires_in = expires_in;
  }

}

export class PasswordResetRequestData {

  public email: string;

}
