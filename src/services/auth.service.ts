import BaseService from '@/services/base.service';
import { PasswordResetRequestData, SignInData, SignUpData, SigninResult } from '@/types/auth.type';
import { User } from '@/types/user.type';
import { BaseMessage } from '@/types/base.type';

export default class AuthService extends BaseService {

  public async me(): Promise<User | null> {
    return this.get('/auth/me');
  }

  public async signin(data: SignInData): Promise<SigninResult | null> {
    return this.post('/auth/signin', data);
  }

  public async signup(data: SignUpData): Promise<SigninResult | null> {
    return this.post('/auth/signup', data);
  }

  public async requestPasswordReset(data: PasswordResetRequestData): Promise<BaseMessage | null> {
    return this.post('/auth/request-password-reset', data);
  }

  public async signout(): Promise<any> {
    return this.delete('/auth/signout');
  }

}

export const authService = new AuthService();
