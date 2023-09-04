'use client'

import Image from 'next/image';
import Input from '@/components/input.component';
import { useContext, useEffect, useState } from 'react';
import { SignInData } from '@/types/auth.type';
import Button from '@/components/button.component';
import { SessionContext } from '@/contexts/session.context';
import Divider from '@/components/divider.component';
import Link from 'next/link';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/snackbar.type';
import Loading from '@/components/loading.component';

export default function Home() {
  const { openSnackbar } = useContext(SnackbarContext);
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

    signin(data)
      .then(() => {
        openSnackbar('Seja bem vindo!', SnackbarType.SUCCESS);
      })
      .catch(() => {
        openSnackbar('Erro ao efetuar login!', SnackbarType.ERROR);
      });
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
            label='E-mail'
            type='email'
            required
            maxLength={ 50 }
            onChange={ (event) => setEmail(event.target.value) }
          />

          <Input
            id='user_password'
            label='Senha'
            type='password'
            required
            minLength={ 8 }
            maxLength={ 100 }
            onChange={ (event) => setPassword(event.target.value) }
          />

          <Button type='submit' label='ENTRAR' primary />
        </form>

        <div className='flex items-center justify-center text-sm'>
          <Link href='/forgot-password'>Esqueci minha senha</Link>
        </div>

        <Divider text='OU' />

        <div className='flex items-center justify-center text-sm'>
          <Link href='/signup'>Criar uma conta</Link>
        </div>
      </div>
    </section>
  )
}
