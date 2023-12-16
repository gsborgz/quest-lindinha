import { UserLanguage, UserTheme } from '@src/types/models/user.type';

export class SignInResult {

  public token: string;

}

export class SignInData {

  public email: string;
  public password: string;
  public expires_in: number;

  constructor(email: string, password: string, expires_in = 86400) {
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
  public language: UserLanguage;
  public theme: UserTheme;
  public expires_in: number;

  constructor(name: string, email: string, password: string, password_confirmation: string, language: UserLanguage, theme: UserTheme, expires_in = 86400) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.language = language;
    this.theme = theme || UserTheme.DARK;
    this.expires_in = expires_in;
  }

}

export class PasswordResetRequestData {

  public email: string;

}

export class ResetPasswordDTO {

  public password: string;
  public password_confirmation: string;

}

export class UpdatePasswordDTO {

  public current_password: string;
  public password: string;
  public password_confirmation: string;

}
