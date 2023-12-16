'use client'

import { useEffect, useState } from 'react';
import { SignInData, SignUpData, SignInResult } from '@src/types/models/auth.type';
import { useRouter, usePathname } from 'next/navigation';
import { User, UserLanguage, UserTheme } from '@src/types/models/user.type';
import { useTheme } from 'next-themes';
import { createContext } from 'react';
import { SessionData } from '@src/types/providers/session.type';
import { useAuthService } from '../hooks/auth-service.hook';

export const SessionContext = createContext({} as SessionData);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const authService = useAuthService();
  const [loadRewards, setLoadRewards] = useState<boolean>(false);
  const [loadQuests, setLoadQuests] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string>('avatar-1' as string);
  const [credits, setCredits] = useState<number>(0 as number);
  const [language, setLanguage] = useState<UserLanguage>(UserLanguage.PTBR);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const publicRoutes = ['/', '/signup'];
    const token = localStorage.getItem('token');

    if (token && publicRoutes.includes(pathName)) {
      router.push('/dashboard');
    }

    if (!token && !publicRoutes.includes(pathName)) {
      router.push('/');
    }

    if (token && !user) {
      authService.me()
        .then(user => {
          setUser(user);

          setAvatar(user.avatar);
          setCredits(user.credits);
        })
        .catch(() => {
          clearTokenData();
        });
    }
  }, [authService, pathName, router, user]);

  async function signin(data: SignInData) {
    authService.signin(data).then(response => logIn(response as SignInResult));
  }

  async function signup(data: SignUpData) {
    authService.signup(data).then(response => logIn(response as SignInResult));
  }

  async function signout() {
    authService.signout()
      .then(() => logOut())
      .finally(() => {
        clearTokenData();
      });
  }

  async function setUserLanguage(newLanguage: UserLanguage) {
    authService.setLanguage(newLanguage).catch(error => console.log(error));
  }

  async function setUserTheme(newTheme: UserTheme) {
    authService.setTheme(newTheme as UserTheme).catch(error => console.log(error));
  }

  async function logIn(response: SignInResult) {
    const { token } = response;

    if (token) {
      setTokenData(token);

      authService.me()
        .then(user => {
          setUser(user);

          if (user.theme) {
            setTheme(user.theme);
          }

          if (user.language) {
            setLanguage(user.language);
          }
        })
        .catch(() => {
          logOut();
        });
    }
  }

  function logOut() {
    setUser(null);
    clearTokenData();
  }

  function setTokenData(token: string) {
    localStorage.setItem('token', token);
  }

  function clearTokenData() {
    localStorage.removeItem('token');
  }

  function changeLanguage(newLanguage: UserLanguage) {
    setLanguage(newLanguage);

    if (user) {
      setUserLanguage(newLanguage);
    }
  }

  function changeTheme(newTheme: UserTheme): void {
    setTheme(newTheme);

    if (user) {
      setUserTheme(newTheme);
    }
  }

  function addCredits(credits: number): void {
    if (user) {
      user.credits += credits;
      setUser(user);
    }
  }

  function removeCredits(credits: number): void {
    if (user) {
      user.credits -= credits;
      setUser(user);
    }
  }

  return (
    <SessionContext.Provider value={{
      user,
      credits,
      avatar,
      loadQuests,
      loadRewards,
      language,
      theme: theme as UserTheme,
      signin,
      signup,
      signout,
      setLoadRewards,
      setLoadQuests,
      setCredits,
      setAvatar,
      changeLanguage,
      changeTheme,
      addCredits,
      removeCredits
    }}>
      { children }
    </SessionContext.Provider>
  );
}
