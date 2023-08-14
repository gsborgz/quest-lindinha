import BaseApi from '@api/base.api';
import { PasswordResetRequestData, SignInData, SignUpData } from '@type/auth.type';

export default class AuthApi extends BaseApi {

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

export const authApi = new AuthApi();
