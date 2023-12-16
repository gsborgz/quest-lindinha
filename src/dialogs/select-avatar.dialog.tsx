'use client'

import { useDictionary } from '../hooks/dictionary.hook';
import { UserIcon } from '@heroicons/react/24/solid';
import Modal from '@src/components/modal.component';
import Button from '@src/components/button.component';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@src/providers/session.provider';
import { ModalContext } from '@src/providers/modal.provider';

export default function QuestDialog() {
  const { locale } = useDictionary();
  const { avatar, user } = useContext(SessionContext);
  const { closeModal } = useContext(ModalContext);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const title = locale('text.avatar');
  const icon = <UserIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const avatars = [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (avatar && !selectedAvatar) {
    setSelectedAvatar(avatar);
  }

  if (selectedAvatar) {
    for (let i = 0; i <= 35; i++) {
      const avatar = `avatar-${i}`;
  
      avatars.push(
        <div className={ `h-14 w-14 rounded-full ${selectedAvatar === avatar ? 'border-2 border-blue-600' : ''}` }>
          <Image
            key={ i }
            src={ `/avatar/${avatar}.jpg` }
            width={40}
            height={40}
            alt='Profile picture'
            className={ `w-full h-full rounded-full cursor-pointer ${selectedAvatar === avatar ? 'border-2 border-blue-600' : ''}` }
            onClick={ () => setSelectedAvatar(avatar) }
          />
        </div>
      );
    }
  }

  function saveAvatar() {
    if (user) {
      user.avatar = selectedAvatar;
    }

    closeModal();
  }

  return (
    <Modal title={ title } icon={ icon }>
      <div className='flex flex-col gap-4 min-w-[400px]'>
        <div className='flex flex-wrap gap-4 justify-between'>
          { avatars.map((avatar) => avatar) }
        </div>

        <Button label={ locale('text.save') } onClick={ saveAvatar } primary />
      </div>
    </Modal>
  );
}
