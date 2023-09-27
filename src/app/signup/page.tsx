'use client'

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/contexts/session.context';
import Input from '@/components/input.component';
import { SignUpData } from '@/types/models/auth.type';
import Button from '@/components/button.component';
import Link from 'next/link';
import Divider from '@/components/divider.component';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/components/snackbar.type';
import Loading from '@/components/loading.component';

export default function SignUp() {
  const { openSnackbar } = useContext(SnackbarContext);
  const { signup } = useContext(SessionContext);
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

    const data = new SignUpData(name, email, password, passwordConfirmation);

    signup(data)
      .then(() => {
        openSnackbar('Conta criada com sucesso. Seja bem vindo!', SnackbarType.SUCCESS);
      })
      .catch(() => {
        openSnackbar('Erro ao criar conta!', SnackbarType.ERROR);
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
      <Image src='/images/default-2.svg' alt='opening image' width={ 700 } height={ 700 } className='ml-16' priority />

      <div className='rounded shadow-lg p-8 bg-slate-100 dark:bg-slate-700 min-w-[30%] flex flex-col gap-8'>
        <form className='flex flex-col gap-8' onSubmit={ logIn }>
          <Input
            id='user_name'
            label='Nome'
            type='text'
            required
            maxLength={ 50 }
            onChange={ (event) => setName(event.target.value) }
          />

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

          <Input
            id='user_password_confirmation'
            label='Confirme sua senha'
            type='password'
            required
            minLength={ 8 }
            maxLength={ 100 }
            onChange={ (event) => setPasswordConfirmation(event.target.value) }
          />

          <Button type='submit' label='ENVIAR' primary />
        </form>

        <Divider text='OU' />

        <div className='flex items-center justify-center text-sm'>
          <Link href='/'>Entrar com uma conta existente</Link>
        </div>
      </div>
    </section>
  )
}
