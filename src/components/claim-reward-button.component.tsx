'use client'

import { useContext } from 'react';
import { SnackbarType } from '@src/types/components/snackbar.type';
import { LifebuoyIcon } from '@heroicons/react/24/solid';
import { ClaimRewardButtonProps } from '@src/types/models/reward.type';
import { SnackbarContext } from '@src/providers/snackbar.provider';
import { SessionContext } from '@src/providers/session.provider';
import { useDictionary } from '../hooks/dictionary.hook';
import { useRewardService } from '../hooks/reward-service.hook';

export default function ClaimRewardButton(props: ClaimRewardButtonProps) {
  const rewardService = useRewardService();
  const { locale } = useDictionary();
  const { openSnackbar } = useContext(SnackbarContext);
  const { user, setLoadRewards, removeCredits } = useContext(SessionContext);

  function claimReward() {
    if (user && user.credits >= props.value) {
      rewardService.claim(props.rewardId)
        .then(() => {
          openSnackbar(locale('text.reward_claimed'), SnackbarType.SUCCESS);
          removeCredits(props.value);
  
          if (props.addAction) {
            props.addAction();
          }
        })
        .catch(() => {
          openSnackbar(locale('text.reward_claim_fail'), SnackbarType.ERROR);
        })
        .finally(() => {
          setLoadRewards(true);
        });
    } else {
      openSnackbar(locale('text.not_enough_credits'), SnackbarType.ERROR);
    }
  }

  return (
    <button type='button' onClick={ claimReward } className='flex flex-col items-center justify-center gap-2 text-slate-50 bg-sky-400 rounded-md p-3 w-full'>
      <span className='text-xs font-bold'>{ locale('text.claim') }</span>

      <span className='text-lg font-bold flex items-center justify-center gap-2'>
        <LifebuoyIcon className='h-6 w-6 text-neutral-50' />
        { props.value }
      </span>
    </button>
  );
}