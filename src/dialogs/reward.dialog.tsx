'use client'

import { Reward, RewardDialogData, RewardStatus } from '@/types/models/reward.type';
import Modal from '@/components/modal.component';
import { GiftIcon } from '@heroicons/react/24/solid';
import { useContext, useState } from 'react';
import { ModalContext } from '@/contexts/modal.context';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/components/snackbar.type';
import Button from '@/components/button.component';
import Input from '@/components/input.component';
import { rewardService } from '@/services/reward.service';
import { SessionContext } from '@/contexts/session.context';
import { DictionaryContext } from '@/contexts/dictionary.context';

export default function RewardDialog(props: RewardDialogData) {
  const { locale } = useContext(DictionaryContext);
  const { closeModal } = useContext(ModalContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<number>(100);
  const title = props.reward?.name || locale('text.new_reward');
  const icon = <GiftIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const { setLoadRewards } = useContext(SessionContext);

  function save(event: React.FormEvent) {
    event.preventDefault();

    const reward = new Reward();

    reward.name = name;
    reward.description = description;
    reward.value = value;

    if (props.reward?._id) {
      reward._id = props.reward?._id;
      reward.status = props.reward?.status;
    } else {
      reward.status = RewardStatus.AVAILABLE;
    }

    rewardService.upsert(reward)
      .then(() => {
        openSnackbar(locale('text.reward_created'), SnackbarType.SUCCESS);
        closeModal();
        setLoadRewards(true);
      })
      .catch(() => {
        openSnackbar(locale('text.reward_creation_fail'), SnackbarType.ERROR);
      });
  }

  function setRewardValue(value: number) {
    if (value < 1) {
      setValue(1);
    } else {
      setValue(value);
    }
  }

  return (
    <Modal title={ title } icon={ icon }>
      <form className='flex flex-col gap-8 w-full' onSubmit={ save }>
        <Input
          id='reward_name'
          label={ locale('text.name')}
          type='string'
          required
          maxLength={ 50 }
          onChange={ (event) => setName(event.target.value) }
        />

        <Input
          id='reward_description'
          label={ locale('text.description') }
          type='string'
          required
          maxLength={ 200 }
          onChange={ (event) => setDescription(event.target.value) }
        />

        <Input
          id='reward_value'
          label={ locale('text.price') }
          type='number'
          required
          onChange={ (event) => setRewardValue(Number(event.target.value)) }
        />

        <Button type='submit' label={ locale('text.create') } primary />
      </form>
    </Modal>
  );
}