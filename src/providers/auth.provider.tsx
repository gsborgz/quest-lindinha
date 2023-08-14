'use client'

import { useState } from 'react';
import { AuthContext } from '@contexts/auth.context';
import { SignInData, SignUpData } from '@type/auth.type';
import { authApi } from '../api/auth.api';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function signin(data: SignInData) {
    await authApi.signin(data)
      .then(() => setIsSignedIn(true));
  }

  async function signup(data: SignUpData) {
    authApi.signup(data)
      .then(() => setIsSignedIn(true));
  }

  async function signout() {
    authApi.signout()
      .then(() => setIsSignedIn(false));
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, signin, signup, signout }}>
      { children }
    </AuthContext.Provider>
  );
}
