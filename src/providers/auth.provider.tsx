'use client'

import { useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/auth.context';
import { SignInData, SignUpData, SignInResult } from '@/types/auth.type';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types/user.type';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
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

  return (
    <AuthContext.Provider value={{ isSignedIn, signin, signup, signout, me }}>
      { children }
    </AuthContext.Provider>
  );
}
