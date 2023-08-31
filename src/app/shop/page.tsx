'use client'

import { ClaimRewardButtonProps, Reward, RewardCardProps, RewardStatus } from '@/types/reward.type';
import { rewardService } from '@/services/reward.service';
import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/snackbar.type';
import { LifebuoyIcon } from '@heroicons/react/24/solid';
import { SessionContext } from '@/contexts/session.context';
import { CreateRewardButton } from '@/components/create-reward-button.component';

export default function Shop() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [status, setStatus] = useState<RewardStatus>(RewardStatus.AVAILABLE);
  const { openSnackbar } = useContext(SnackbarContext);
  const { loadRewards, setLoadRewards } = useContext(SessionContext);

  function findRewards() {
    rewardService.findAll({ status })
      .then((rewards) => {
        setRewards(rewards || []);
      })
      .catch(() => {
        openSnackbar('Erro ao carregar recompensas!', SnackbarType.ERROR);
      })
      .finally(() => {
        setLoadRewards(false);
      });
  }

  useEffect(() => {
    setMounted(true);
    setLoadRewards(true);
  }, [setLoadRewards]);

  if (mounted && loadRewards) {
    findRewards();
  }

  if (rewards.length) {
    return (
      <section className='flex flex-wrap items-center justify-center gap-10'>
        { rewards.map((reward) => <RewardCard key={ reward._id } reward={ reward } />) }
      </section>
    );
  }

  return (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <span>Você ainda não cadastrou nenhuma recompensa</span>
      <div className='flex flex-row items-center gap-1'>
        <span>Experimente criar uma clicando nesse botão:</span>
        <CreateRewardButton />
      </div>
    </section>
  );
}

function RewardCard(props: RewardCardProps) {
  const { reward } = props;

  function formatedName(name: string) {
    if (name.length <= 30) {
      return name;
    }

    if (!name.substring(0, 10).includes(' ')) {
      return `${ name.substring(0, 7) }...`;
    }

    return `${ name.substring(0, 27) }...`;
  }

  function formatedDescription(description: string) {
    if (description.length <= 50) {
      return description;
    }

    if (!description.substring(0, 20).includes(' ')) {
      return `${ description.substring(0, 17) }...`;
    }

    return `${ description.substring(0, 47) }...`;
  }

  return (
    <div className='flex flex-col items-center justify-center w-60 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg gap-4'>
      <div className='flex items-center justify-center text-xl font-bold w-full h-14'>
        { formatedName(reward.name) }
      </div>

      <div className='flex items-center justify-center bg-slate-200 dark:bg-slate-600 rounded-lg text-sm break-words p-4 w-full h-20'>
        { formatedDescription(reward.description) }
      </div>

      <ClaimRewardButton value={ reward.value } rewardId={ reward._id } />
    </div>
  );
}

function ClaimRewardButton(props: ClaimRewardButtonProps) {
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoadRewards } = useContext(SessionContext);

  function claimReward() {
    rewardService.claim(props.rewardId)
      .then(() => {
        openSnackbar('Recompensa resgata!', SnackbarType.SUCCESS);
      })
      .catch(() => {
        openSnackbar('Erro ao resgatar recompensa!', SnackbarType.ERROR);
      })
      .finally(() => {
        setLoadRewards(true);
      });
  }

  return (
    <button type="button" onClick={ claimReward } className='flex flex-col items-center justify-center gap-2 text-slate-50 bg-sky-400 rounded-md p-3 w-full'>
      <span className='text-xs font-bold'>Resgatar</span>

      <span className='text-lg font-bold flex items-center justify-center gap-2'>
        <LifebuoyIcon className='h-6 w-6 text-slate-700 dark:text-neutral-50' />
        { props.value }
      </span>
    </button>
  );
}
