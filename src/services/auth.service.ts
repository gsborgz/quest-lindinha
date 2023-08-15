import BaseService from '@/services/base.service';
import { PasswordResetRequestData, SignInData, SignUpData } from '@/types/auth.type';

export default class AuthService extends BaseService {

  public async me() {
    return this.get('/auth/me');
  }

  public async signin(data: SignInData) {
    return this.post('/auth/signin', data);
  }

  public async signup(data: SignUpData) {
    return this.post('/auth/signup', data);
  }

  public async requestPasswordReset(data: PasswordResetRequestData) {
    return this.post('/auth/request-password-reset', data);
  }

  public async signout() {
    return this.delete('/auth/signout');
  }

}

export const authService = new AuthService();
