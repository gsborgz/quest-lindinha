'use client'

import Image from 'next/image';
import Input from '@components/input.component';
import { useContext, useState } from 'react';
import { SignInData } from '@type/auth.type';
import Button from '@components/button.component';
import { AuthContext } from '@contexts/auth.context';
import Divider from '@components/divider.component';
import Link from 'next/link';

export default function Home() {
  const { signin } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function logIn() {
    const data = new SignInData();

    data.email = email;
    data.password = password;

    await signin(data);
  }

  return (
    <section className='flex flex-row justify-between items-center min-h-full'>
      <Image src='/images/default-3.svg' alt='opening image' width={700} height={700} className='ml-16' />

      <div className='rounded shadow-lg p-8 bg-slate-100 dark:bg-slate-700 w-[30%] flex flex-col gap-8'>
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
