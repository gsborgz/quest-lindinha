'use client'

import { useEffect, useState } from 'react';
import { SessionContext } from '@/contexts/session.context';
import { SignInData, SignUpData, SignInResult } from '@/types/auth.type';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types/user.type';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [loadRewards, setLoadRewards] = useState<boolean>(true);
  const [loadQuests, setLoadQuests] = useState<boolean>(true);
  const [me, setMe] = useState<User | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    const token = localStorage.getItem('token');

    if (isSignedIn === 'true' && token) {
      setIsSignedIn(true);

      if (pathName === '/' || pathName === '/signup') {
        router.push('/dashboard');
      }
    } else {
      setIsSignedIn(false);
      clearLocalStorage();

      if (pathName === '/dashboard' || pathName === '/shop') {
        router.push('/');
      }
    }
  }, [isSignedIn, me, pathName, router]);
  
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
      .catch(error => console.log(error))
      .finally(() => {
        clearLocalStorage();
        setIsSignedIn(false);
      });
  }

  async function logIn(response: SignInResult) {
    if (response.token) {
      setToken(response);
      setMeData();
  
      if (isSignedIn) {
        router.push('/dashboard'); 
      }
    }
  }

  async function setMeData() {
    authService.me()
      .then(user => {
        localStorage.setItem('isSignedIn', 'true');

        setMe(user);
        setIsSignedIn(true);
      })
      .catch(error => console.log(error));
  }

  function setToken(response: SignInResult) {
    const { token } = response;

    localStorage.setItem('token', token);
  }

  function clearLocalStorage() {
    localStorage.setItem('isSignedIn', 'false');
    localStorage.removeItem('token');
  }

  function toggleLoadQuests() {
    if (pathName === '/dashboard') {
      setLoadQuests(!loadQuests);
    }
  }

  function toggleLoadRewards() {
    if (pathName === '/shop') {
      setLoadRewards(!loadRewards);
    }
  }

  return (
    <SessionContext.Provider value={{ isSignedIn, me, loadQuests, loadRewards, signin, signup, signout, toggleLoadQuests, toggleLoadRewards }}>
      { children }
    </SessionContext.Provider>
  );
}
