'use client'

import { useState } from 'react';
import { AuthContext } from '@/contexts/auth.context';
import { SignInData, SignUpData } from '@/types/auth.type';
import { authService } from '@/services/auth.service';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function signin(data: SignInData) {
    await authService.signin(data)
      .then(() => setIsSignedIn(true));
  }

  async function signup(data: SignUpData) {
    authService.signup(data)
      .then(() => setIsSignedIn(true));
  }

  async function signout() {
    authService.signout()
      .then(() => setIsSignedIn(false));
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, signin, signup, signout }}>
      { children }
    </AuthContext.Provider>
  );
}
