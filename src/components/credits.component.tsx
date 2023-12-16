import { useContext } from 'react';
import { SessionContext } from '@src/providers/session.provider';
import { LifebuoyIcon } from '@heroicons/react/24/solid';

export default function Credits() {
  const { user } = useContext(SessionContext);

  return (
    <span className='text-sm font-bold flex items-center justify-center gap-1 text-sky-400 select-none'>
      <LifebuoyIcon className='h-5 w-5' />

      { user?.credits }
    </span>
  );
}