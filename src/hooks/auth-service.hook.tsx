'use client'

import { BaseMessage, RequestOptions } from '@/types/base.type';
import { PasswordResetRequestData, SignInData, SignInResult, SignUpData } from '@/types/models/auth.type';
import { User, UserLanguage } from '@/types/models/user.type';
import { useBaseService } from '@/hooks/base-service.hook';
import { AuthServiceData } from '@/types/hooks/auth-service.type';

export function useAuthService(): AuthServiceData {
  const baseService = useBaseService();

  async function me(): Promise<User> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = '/auth/me';
    
    return baseService.get(options);
  }

  async function signin(data: SignInData): Promise<SignInResult> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/signin';

    return baseService.post(options);
  }

  async function signup(data: SignUpData): Promise<SignInResult> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/signup';

    return baseService.post(options);
  }

  async function requestPasswordReset(data: PasswordResetRequestData): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/request-password-reset';
    
    return baseService.post(options);
  }

  async function signout(): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = '/auth/signout';

    return baseService.delete(options);
  }

  async function setLanguage(language: UserLanguage): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/auth/set-language/${language}`;

    return baseService.put(options);
  }

  async function setTheme(theme: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/auth/set-theme/${theme}`;

    return baseService.put(options);
  }

  return {
    me,
    signin,
    signup,
    requestPasswordReset,
    signout,
    setLanguage,
    setTheme
  };
}