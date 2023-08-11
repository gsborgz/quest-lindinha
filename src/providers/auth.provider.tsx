'use client'

import { useState } from 'react';
import { AuthContext } from '@contexts/auth.context';
import { SignInData, SignUpData } from '@type/auth.type';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function signIn(data: SignInData) {
    console.log(data);
    
    setIsSignedIn(true);
  }

  function signUp(data: SignUpData) {
    setIsSignedIn(true);
  }

  function signOut() {
    setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signUp, signOut }}>
      { children }
    </AuthContext.Provider>
  );
}
