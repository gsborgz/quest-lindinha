'use client'

import { Reward, RewardDialogData, RewardStatus } from '@/types/models/reward.type';
import Modal from '@/components/modal.component';
import { GiftIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { SnackbarType } from '@/types/components/snackbar.type';
import Button from '@/components/button.component';
import Input from '@/components/input.component';
import ClaimRewardButton from '@/components/claim-reward-button.component';
import Divider from '@/components/divider.component';
import { ModalContext } from '@/providers/modal.provider';
import { SnackbarContext } from '@/providers/snackbar.provider';
import { SessionContext } from '@/providers/session.provider';
import { useRewardService } from '@/hooks/reward-service.hook';
import { useDictionary } from '../hooks/dictionary.hook';

export default function RewardDialog(props: RewardDialogData) {
  const rewardService = useRewardService();
  const { locale } = useDictionary();
  const { closeModal } = useContext(ModalContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoadRewards } = useContext(SessionContext);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<number>(100);
  const [reward, setReward] = useState<Reward | null>(null);
  const [disableFields, setDisableFields] = useState<boolean>(false);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const title = props.rewardId ? locale('text.reward_details') : locale('text.new_reward');
  const icon = <GiftIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;

  useEffect(() => {
    if (props.rewardId && !reward) {
      rewardService.findOne(props.rewardId).then((response) => {
        setReward(response);

        if (response.status === RewardStatus.CLAIMED) {
          setDisableFields(true);
        }

        setName(response.name);
        setDescription(response.description);
        setValue(response.value);
      });
    }
  }, [props, reward, rewardService]);

  function setRewardName(newValue: string): void {
    setName(newValue);

    if (props.rewardId) {
      edit(newValue, description, value);
    }
  }

  function setRewardDescription(newValue: string): void {
    setDescription(newValue);

    if (props.rewardId) {
      edit(name, newValue, value);
    }
  }

  function setRewardValue(newValue: number): void {
    if (newValue < 1) {
      setValue(1);
    } else {
      setValue(newValue);
    }

    if (props.rewardId) {
      edit(name, description, newValue);
    }
  }

  function save(event: React.FormEvent) {
    event.preventDefault();

    const reward = new Reward();

    reward.name = name;
    reward.description = description;
    reward.value = value;
    reward.status = RewardStatus.AVAILABLE;

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

  function edit(newName: string, newDescription: string, newValue: number): void {
    const quest = new Reward();

    quest.name = newName;
    quest.description = newDescription;
    quest.value = newValue;
    quest.status = RewardStatus.AVAILABLE;
    quest._id = props.rewardId as string;

    rewardService.upsert(quest)
      .then(() => {
        openSnackbar(locale('text.mission_updated'), SnackbarType.SUCCESS);
        setLoadRewards(true);
      })
      .catch(() => {
        openSnackbar(locale('text.mission_update_fail'), SnackbarType.ERROR);
      });
  }

  function removeReward(): void {
    rewardService.remove(props.rewardId as string)
      .then(() => {
        openSnackbar(locale('text.reward_deleted'), SnackbarType.SUCCESS);
        closeModal();
        setLoadRewards(true);
      })
      .catch(() => {
        openSnackbar(locale('text.reward_delete_fail'), SnackbarType.ERROR);
      });
  }

  return (
    <Modal title={ title } icon={ icon }>
      <form className='flex flex-col gap-8 w-full' onSubmit={ save }>
        <Input
          id='reward_name'
          label={ locale('text.name')}
          type='string'
          initialValue={ name }
          disabled={ disableFields }
          required
          maxLength={ 50 }
          onChange={ (event) => setRewardName(event.target.value) }
        />

        <Input
          id='reward_description'
          label={ locale('text.description') }
          type='string'
          initialValue={ description }
          disabled={ disableFields }
          required
          maxLength={ 200 }
          onChange={ (event) => setRewardDescription(event.target.value) }
        />

        <Input
          id='reward_value'
          label={ locale('text.price') }
          type='number'
          initialValue={ value }
          disabled={ disableFields }
          required
          onChange={ (event) => setRewardValue(Number(event.target.value)) }
        />

        { props.rewardId && reward ? reward.status === RewardStatus.AVAILABLE ? (
          <>
            <ClaimRewardButton value={ reward.value } rewardId={ reward._id } addAction={ closeModal } />

            { !showDeleteButton ? (
              <Divider text={ locale('text.show_more') } onClick={ () => setShowDeleteButton(true) } />
            ) : (
              <Divider text={ locale('text.show_less') } onClick={ () => setShowDeleteButton(false) } />
            ) }

            { showDeleteButton ? (
              <Button type='button' bgColor='bg-red-500' label={ locale('text.remove') } onClick={ () => removeReward() } />
            ) : null }
          </>
        ) : null : (
          <Button type='submit' label={ locale('text.create') } primary />
        ) }
      </form>
    </Modal>
  );
}