'use client'

import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/contexts/session.context';
import { SignInData, SignUpData, SignInResult } from '@/types/models/auth.type';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types/models/user.type';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/components/snackbar.type';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const { openSnackbar } = useContext(SnackbarContext);
  const [loadRewards, setLoadRewards] = useState<boolean>(false);
  const [loadQuests, setLoadQuests] = useState<boolean>(false);
  const [token, setToken] = useState<string | null | undefined>(null);
  const [user, setUser] = useState<User | null>(null);
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
      .then(response => {
        logIn(response as SignInResult)
        openSnackbar('Seja bem vindo!', SnackbarType.SUCCESS);
      })
      .catch((error) => openSnackbar('Erro ao efetuar o login!', SnackbarType.ERROR));
  }

  async function signup(data: SignUpData) {
    authService.signup(data)
      .then(response => {
        openSnackbar('Conta criada com sucesso. Seja bem vindo!', SnackbarType.SUCCESS);
        logIn(response as SignInResult)
      })
      .catch((error) => openSnackbar('Erro ao criar conta!', SnackbarType.ERROR));
  }

  async function signout() {
    authService.signout()
      .then(() => logOut())
      .catch((error) => openSnackbar('Erro ao limpar dados da sessão!', SnackbarType.ERROR))
      .finally(() => {
        clearTokenData();
      });
  }

  async function logIn(response: SignInResult) {
    const { token } = response;

    if (token) {
      setTokenData(token);

      authService.me()
        .then(user => {
          setUser(user);
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

  return (
    <SessionContext.Provider value={{ user, loadQuests, loadRewards, signin, signup, signout, setLoadRewards, setLoadQuests }}>
      { children }
    </SessionContext.Provider>
  );
}
