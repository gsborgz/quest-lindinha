import { createContext, useContext } from 'react';
import { AuthServiceData } from '@/types/providers/auth-service.type';
import { User, UserLanguage } from '@/types/models/user.type';
import { PasswordResetRequestData, SignInData, SignInResult, SignUpData } from '@/types/models/auth.type';
import { BaseMessage, RequestOptions } from '@/types/base.type';
import { baseService } from '@/services/base.service';
import { DictionaryContext } from '@/providers/dictionary.provider';
import { SnackbarContext } from '@/providers/snackbar.provider';

export const AuthServiceContext = createContext({} as AuthServiceData);

export function AuthServiceProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useContext(DictionaryContext);
  const { openSnackbar } = useContext(SnackbarContext);

  async function me(): Promise<User> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = '/auth/me';
    
    return baseService.get(options, locale, openSnackbar);
  }

  async function signin(data: SignInData): Promise<SignInResult> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/signin';

    return baseService.post(options, locale, openSnackbar);
  }

  async function signup(data: SignUpData): Promise<SignInResult> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/signup';

    return baseService.post(options, locale, openSnackbar);
  }

  async function requestPasswordReset(data: PasswordResetRequestData): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.data = data;
    options.uri = '/auth/request-password-reset';
    
    return baseService.post(options, locale, openSnackbar);
  }

  async function signout(): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = '/auth/signout';

    return baseService.delete(options, locale, openSnackbar);
  }

  async function setLanguage(language: UserLanguage): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/auth/set-language/${language}`;

    return baseService.put(options, locale, openSnackbar);
  }

  async function setTheme(theme: string): Promise<BaseMessage> {
    const options = new RequestOptions();

    options.headers = baseService.getAuthorizationHeader();
    options.uri = `/auth/set-theme/${theme}`;

    return baseService.put(options, locale, openSnackbar);
  }

  return (
    <AuthServiceContext.Provider value={{
      me,
      signin,
      signup,
      requestPasswordReset,
      signout,
      setLanguage,
      setTheme
    }}>
      { children }
    </AuthServiceContext.Provider>
  );
}
