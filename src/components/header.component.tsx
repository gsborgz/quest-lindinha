'use client'

import React, { useContext } from 'react';
import Avatar from '@/components/avatar.component';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/solid';
import { MenuContext } from '@/contexts/menu.context';
import { SessionContext } from '@/contexts/session.context';
import { QuestButtonData } from '@/types/quest.type';
import { ModalContext } from '@/contexts/modal.context';
import QuestDialog from '@/dialogs/quest.dialog';
import Button from '@/components/button.component';
import RewardDialog from '@/dialogs/reward.dialog';
import { RewardButtonData } from '@/types/reward.type';

export default function Header() {
  const { isSignedIn } = useContext(SessionContext);
  const { toggleMenu } = useContext(MenuContext);

  if (!isSignedIn) {
    return null;
  }

  return (
    <header className='sticky top-0 z-30 w-full min-h-[7%] !p-0 sm:px-4 border-b bg-neutral-50 dark:bg-slate-900 border-neutral-200 dark:border-slate-700'>
      <nav className='w-full flex flex-row items-center justify-between'>
        <div className='flex items-center justify-center'>
          <button
            aria-label='Expand menu'
            type='button'
            className='flex items-center justify-center rounded-lg transition-colors p-2 mx-3 hover:bg-neutral-200 dark:hover:bg-zinc-700'
            onClick={toggleMenu}
          >
            <Bars3Icon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />
          </button>

          <div className='flex items-center justify-start gap-4'>
            <QuestButton />

            <RewardButton />
          </div>
        </div>

        <div className='flex items-center justify-end px-4 py-3'>
          <Avatar />
        </div>
      </nav>
    </header>
  );
}

function QuestButton(props: QuestButtonData) {
  const { showModal, toggleModal } = useContext(ModalContext);
  const icon = <PlusIcon className='h-5 w-5 ml-[-4px] text-neutral-50' />

  function setModal() {
    if (!showModal) {
      const dialog = <QuestDialog quest={props.quest}  />;

      toggleModal(dialog);
    } else {
      toggleModal(null)
    }
  }

  return <Button icon={ icon } label='Missão' onClick={ setModal } primary />
}

function RewardButton(props: RewardButtonData) {
  const { showModal, toggleModal } = useContext(ModalContext);
  const icon = <PlusIcon className='h-5 w-5 ml-[-4px] text-neutral-50' />

  function setModal() {
    if (!showModal) {
      const dialog = <RewardDialog reward={props.reward} />;

      toggleModal(dialog);
    } else {
      toggleModal(null)
    }
  }

  return <Button icon={ icon } label='Recompensa' onClick={ setModal } primary />
}
