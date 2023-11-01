'use client'

import { PlusIcon } from '@heroicons/react/24/solid';
import { RewardButtonData } from '@/types/models/reward.type';
import { useContext } from 'react';
import RewardDialog from '@/dialogs/reward.dialog';
import Button from '@/components/button.component';
import { ModalContext } from '@/providers/modal.provider';
import { useDictionary } from '../hooks/dictionary.hook';

export function CreateRewardButton(props: RewardButtonData) {
  const { locale } = useDictionary();
  const { showModal, toggleModal } = useContext(ModalContext);
  const icon = <PlusIcon className='h-5 w-5 ml-[-4px] text-neutral-50' />

  function setModal() {
    if (!showModal) {
      const dialog = <RewardDialog />;

      toggleModal(dialog);
    } else {
      toggleModal(null);
    }
  }

  return <Button icon={ icon } label={ locale('text.reward') } onClick={ setModal } full={ props.full } primary />
}