import BaseService from '@/services/base.service';
import { PasswordResetRequestData, SignInData, SignUpData, SignInResult } from '@/types/models/auth.type';
import { User } from '@/types/models/user.type';
import { BaseMessage, RequestOptions } from '@/types/base.type';

export default class AuthService extends BaseService {

  public async me(): Promise<User> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = '/auth/me';
    
    return this.get(options);
  }

  public async signin(data: SignInData): Promise<SignInResult> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/signin';

    return this.post(options);
  }

  public async signup(data: SignUpData): Promise<SignInResult> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/signup';

    return this.post(options);
  }

  public async requestPasswordReset(data: PasswordResetRequestData): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/request-password-reset';
    
    return this.post(options);
  }

  public async signout(): Promise<any> {
    const options = new RequestOptions();

    options.headers = this.getAuthorizationHeader();
    options.uri = '/auth/signout';

    return this.delete(options);
  }

}

export const authService = new AuthService();
