'use client'

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Input from '@/components/input.component';
import { SignUpData } from '@/types/models/auth.type';
import Button from '@/components/button.component';
import Link from 'next/link';
import Divider from '@/components/divider.component';
import Loading from '@/components/loading.component';
import { SessionContext } from '@/providers/session.provider';
import { useDictionary } from '@/hooks/dictionary.hook';

export default function SignUp() {
  const { locale } = useDictionary();
  const { language, theme, signup } = useContext(SessionContext);
  const [mounted, setMounted] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  function logIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !email || !password || !passwordConfirmation) {
      return;
    }

    if (password !== passwordConfirmation) {
      return;
    }

    const data = new SignUpData(name, email, password, passwordConfirmation, language, theme);

    signup(data);
  }

  if (!mounted) {
    return (
      <section className='flex flex-row justify-between items-center min-h-full'>
        <Loading />
      </section>
    ); 
  }

  return (
    <section className='flex flex-row justify-between items-center min-h-full'>
      <Image src='/images/default-2.svg' alt='opening image' width={ 700 } height={ 700 } className='ml-16' priority />

      <div className='rounded shadow-lg p-8 bg-slate-100 dark:bg-slate-700 min-w-[30%] flex flex-col gap-8'>
        <form className='flex flex-col gap-8' onSubmit={ logIn }>
          <Input
            id='user_name'
            label={ locale('text.name') }
            type='text'
            required
            maxLength={ 50 }
            onChange={ (event) => setName(event.target.value) }
          />

          <Input
            id='user_email'
            label={ locale('text.email') }
            type='email'
            required
            maxLength={ 50 }
            onChange={ (event) => setEmail(event.target.value) }
          />

          <Input
            id='user_password'
            label={ locale('text.password') }
            type='password'
            required
            minLength={ 8 }
            maxLength={ 100 }
            onChange={ (event) => setPassword(event.target.value) }
          />

          <Input
            id='user_password_confirmation'
            label={ locale('text.password_confirmation') }
            type='password'
            required
            minLength={ 8 }
            maxLength={ 100 }
            onChange={ (event) => setPasswordConfirmation(event.target.value) }
          />

          <Button type='submit' label={ locale('text.signup_btn') } primary />
        </form>

        <Divider text={ locale('text.or') } />

        <div className='flex items-center justify-center text-sm'>
          <Link href='/'>{ locale('text.login_with_account') }</Link>
        </div>
      </div>
    </section>
  )
}
