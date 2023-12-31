'use client'

import Image from 'next/image';
import Input from '@src/components/input.component';
import { useContext, useEffect, useState } from 'react';
import { SignInData } from '@src/types/models/auth.type';
import Button from '@src/components/button.component';
import Divider from '@src/components/divider.component';
import Link from 'next/link';
import Loading from '@src/components/loading.component';
import { SessionContext } from '@src/providers/session.provider';
import { useDictionary } from '../hooks/dictionary.hook';

export default function Home() {
  const { locale } = useDictionary();
  const { signin } = useContext(SessionContext);
  const [mounted, setMounted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  function logIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    const data = new SignInData(email, password);

    signin(data);
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
      <Image src='/images/default-3.svg' alt='opening image' width={700} height={700} className='ml-16' priority />

      <div className='rounded shadow-lg p-8 bg-slate-100 dark:bg-slate-700 min-w-[30%] flex flex-col gap-8'>
        <form className='flex flex-col gap-8' onSubmit={ logIn }>
          <Input
            id='user_email'
            label={ locale('text.email')}
            type='email'
            required
            maxLength={ 50 }
            onChange={ (event) => setEmail(event.target.value) }
          />

          <Input
            id='user_password'
            label={ locale('text.password')}
            type='password'
            required
            minLength={ 8 }
            maxLength={ 100 }
            onChange={ (event) => setPassword(event.target.value) }
          />

          <Button type='submit' label={ locale('text.signin_btn') } primary />
        </form>

        <div className='flex items-center justify-center text-sm'>
          <Link href='/forgot-password'>{ locale('text.forgot_password') }</Link>
        </div>

        <Divider text={ locale('text.or') } />

        <div className='flex items-center justify-center text-sm'>
          <Link href='/signup'>{ locale('text.create_account') }</Link>
        </div>
      </div>
    </section>
  )
}
