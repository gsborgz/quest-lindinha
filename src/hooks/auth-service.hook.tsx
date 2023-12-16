'use client'

import { BaseMessage, RequestOptions } from '@src/types/base.type';
import { PasswordResetRequestData, ResetPasswordDTO, SignInData, SignInResult, SignUpData, UpdatePasswordDTO } from '@src/types/models/auth.type';
import { UpdateProfileDTO, User, UserLanguage } from '@src/types/models/user.type';
import { useBaseService } from '@src/hooks/base-service.hook';

export type AuthServiceData = {
  me: () => Promise<User>;
  signin: (data: SignInData) => Promise<SignInResult>;
  signup: (data: SignUpData) => Promise<SignInResult>;
  requestPasswordReset: (data: PasswordResetRequestData) => Promise<BaseMessage>;
  signout: () => Promise<BaseMessage>;
  updateProfile: (data: UpdateProfileDTO) => Promise<BaseMessage>;
  resetPassword: (data: ResetPasswordDTO) => Promise<BaseMessage>;
  updatePassword: (data: UpdatePasswordDTO) => Promise<BaseMessage>;
  setLanguage: (language: UserLanguage) => Promise<BaseMessage>;
  setTheme: (theme: string) => Promise<BaseMessage>;
}

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

  async function updateProfile(data: UpdateProfileDTO): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.data = data;
    options.uri = '/auth/update-profile';

    return baseService.put(options);
  }

  async function resetPassword(data: ResetPasswordDTO): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.data = data;
    options.uri = '/auth/reset-password';

    return baseService.put(options);
  }

  async function updatePassword(data: UpdatePasswordDTO): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.data = data;
    options.uri = '/auth/update-password';

    return baseService.put(options);
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
    updateProfile,
    resetPassword,
    updatePassword,
    setLanguage,
    setTheme
  };
}