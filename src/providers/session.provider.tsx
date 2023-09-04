'use client'

import { useEffect, useState } from 'react';
import { SessionContext } from '@/contexts/session.context';
import { SignInData, SignUpData, SignInResult } from '@/types/auth.type';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types/user.type';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [loadRewards, setLoadRewards] = useState<boolean>(false);
  const [loadQuests, setLoadQuests] = useState<boolean>(false);
  const [checkSession, setCheckSession] = useState<boolean>(false);
  const [token, setToken] = useState<string | null | undefined>(null);
  const [user, setUser] = useState<User | null>(null);
  const publicRoutes = ['/', '/signup'];
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setCheckSession(true);
  }, []);

  if (token && publicRoutes.includes(pathName)) {
    router.push('/dashboard');
  }

  if (!token && !publicRoutes.includes(pathName)) {
    router.push('/');
  }

  if (checkSession) {
    checkSessionData();
  }

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

  async function logIn(response: SignInResult) {
    const { token } = response;

    if (token) {
      setTokenData(token);

      await setUserData();

      router.push('/dashboard');
    }
  }

  function logOut() {
    setUser(null);
    clearTokenData();

    router.push('/');
  }

  function checkSessionData() {
    if (token && publicRoutes.includes(pathName)) {
      setUserData();
    }

    setCheckSession(false);
  }

  async function setUserData() {
    await authService.me()
      .then(user => {
        setUser(user);
      })
      .catch(() => {
        clearTokenData();

        router.push('/');
      });
  }

  function setTokenData(token: string) {
    localStorage.setItem('token', token);
    setToken(token);
  }

  function clearTokenData() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <SessionContext.Provider value={{ user, loadQuests, loadRewards, signin, signup, signout, setLoadRewards, setLoadQuests }}>
      { children }
    </SessionContext.Provider>
  );
}
