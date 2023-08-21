import BaseService from '@/services/base.service';
import { PasswordResetRequestData, SignInData, SignUpData, SignInResult } from '@/types/auth.type';
import { User } from '@/types/user.type';
import { BaseMessage } from '@/types/base.type';

export default class AuthService extends BaseService {

  public async me(): Promise<User | null> {
    const headers = this.getAuthorizationHeader();

    return this.get('/auth/me', headers);
  }

  public async signin(data: SignInData): Promise<SignInResult | null> {
    return this.post('/auth/signin', data);
  }

  public async signup(data: SignUpData): Promise<SignInResult | null> {
    return this.post('/auth/signup', data);
  }

  public async requestPasswordReset(data: PasswordResetRequestData): Promise<BaseMessage | null> {
    return this.post('/auth/request-password-reset', data);
  }

  public async signout(): Promise<any> {
    const headers = this.getAuthorizationHeader();

    return this.delete('/auth/signout', headers);
  }

}

export const authService = new AuthService();
