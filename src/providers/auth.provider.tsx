'use client'

import { useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/auth.context';
import { SignInData, SignUpData, SignInResult } from '@/types/auth.type';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types/user.type';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [me, setMe] = useState<User | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  
  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    const token = localStorage.getItem('token');

    if (isSignedIn === 'true' && token) {
      setIsSignedIn(true);

      try {
        setMeData();
      } catch (error) {
        setIsSignedIn(false);
        clearLocalStorage();
  
        router.push('/');
      }

      if (pathName === '/' || pathName === '/signup') {
        router.push('/dashboard');
      }
    } else {
      setIsSignedIn(false);
      clearLocalStorage();

      router.push('/');
    }
  }, [isSignedIn, me, pathName, router]);
  
  async function signin(data: SignInData) {
    const response = await authService.signin(data);

    if (!response) {
      console.log('erro em signin');      
    }

    logIn(response as SignInResult);
  }

  async function signup(data: SignUpData) {
    const response = await authService.signup(data);

    if (!response) {
      console.log('erro em signup');
    }

    logIn(response as SignInResult);
  }

  async function signout() {
    const response = await authService.signout();

    if (!response) {
      console.log('erro em signout');
    }

    setIsSignedIn(false);
    clearLocalStorage();
  }

  async function logIn(response: SignInResult) {
    setToken(response);
    setMeData();
    
    
    if (isSignedIn) {
      router.push('/dashboard'); 
    }
  }

  async function setMeData() {
    const user = await authService.me();

    if (user) {
      localStorage.setItem('isSignedIn', 'true');

      setMe(user);
      setIsSignedIn(true);
    } else {
      console.log('erro em getMe');
    }
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
