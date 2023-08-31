'use client'

import { PlusIcon } from '@heroicons/react/24/solid';
import { ModalContext } from '@/contexts/modal.context';
import { RewardButtonData } from '@/types/reward.type';
import { useContext } from 'react';
import RewardDialog from '@/dialogs/reward.dialog';
import Button from '@/components/button.component';

export function CreateRewardButton(props: RewardButtonData) {
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

  return <Button icon={ icon } label='Recompensa' onClick={ setModal } full={ props.full } primary />
}