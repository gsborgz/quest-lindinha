'use client'

import { useEffect, useState } from 'react';
import { SessionContext } from '@/contexts/session.context';
import { SignInData, SignUpData, SignInResult } from '@/types/models/auth.type';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';
import { User, UserLanguage, UserTheme } from '@/types/models/user.type';
import { useTheme } from 'next-themes';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [loadRewards, setLoadRewards] = useState<boolean>(false);
  const [loadQuests, setLoadQuests] = useState<boolean>(false);
  const [token, setToken] = useState<string | null | undefined>(null);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<UserLanguage>(UserLanguage.PTBR);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const publicRoutes = ['/', '/signup'];

    setToken(localStorage.getItem('token'));

    if (token && publicRoutes.includes(pathName)) {
      router.push('/dashboard');
    }
  
    if (!token && !publicRoutes.includes(pathName)) {
      router.push('/');
    }

    if (token && publicRoutes.includes(pathName)) {
      authService.me()
        .then(user => {
          setUser(user);
        })
        .catch(() => {
          clearTokenData();
        });
    }

  }, [pathName, router, token]);

  async function signin(data: SignInData) {
    authService.signin(data)
      .then(response => logIn(response as SignInResult))
      .catch(error => console.log(error));
  }

  async function signup(data: SignUpData) {
    authService.signup(data)
      .then(response => logIn(response as SignInResult))
      .catch(error => console.log(error));
  }

  async function signout() {
    authService.signout()
      .then(() => logOut())
      .catch(error => console.log(error))
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
    setToken(token);
  }

  function clearTokenData() {
    localStorage.removeItem('token');
    setToken(null);
  }

  function changeLanguage(newLanguage: UserLanguage) {
    setLanguage(newLanguage);

    if (user) {
      setUserLanguage(newLanguage);
    }
  }

  function changeTheme(newTheme: UserTheme) {
    setTheme(newTheme);

    if (user) {
      setUserTheme(newTheme);
    }
  }

  return (
    <SessionContext.Provider value={{
      user,
      loadQuests,
      loadRewards,
      language,
      theme: theme as UserTheme,
      signin,
      signup,
      signout,
      setLoadRewards,
      setLoadQuests,
      changeLanguage,
      changeTheme
    }}>
      { children }
    </SessionContext.Provider>
  );
}
