'use client'

import { Reward, RewardCardProps, RewardStatus } from '@/types/models/reward.type';
import { rewardService } from '@/services/reward.service';
import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/components/snackbar.type';
import { SessionContext } from '@/contexts/session.context';
import { CreateRewardButton } from '@/components/create-reward-button.component';
import Loading from '@/components/loading.component';
import StatusSelect from '@/components/status-select.component';
import { DictionaryContext } from '@/contexts/dictionary.context';
import RewardDialog from '@/dialogs/reward.dialog';
import { ModalContext } from '@/contexts/modal.context';
import ClaimRewardButton from '@/components/claim-reward-button.component';

export default function Shop() {
  const { locale } = useContext(DictionaryContext);
  const [mounted, setMounted] = useState<boolean>(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [status, setStatus] = useState<RewardStatus>(RewardStatus.AVAILABLE);
  const [loading, setLoading] = useState<boolean>(true);
  const rewardStatus = [RewardStatus.AVAILABLE, RewardStatus.CLAIMED];
  const { openSnackbar } = useContext(SnackbarContext);
  const { loadRewards, setLoadRewards } = useContext(SessionContext);

  async function findRewards() {
    await rewardService.findAll({ status })
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

  async function init() {
    await findRewards();

    setLoading(false);
  }

  function updateSelectedStatus(status: RewardStatus) {
    setStatus(status);
    setLoadRewards(true);
  }

  useEffect(() => {
    setMounted(true);
    setLoadRewards(true);
  }, [setLoadRewards]);

  if (mounted && loadRewards) {
    init();
  }

  if (loading) {
    return (
      <section className='flex flex-wrap items-center justify-center h-[93%]'>
        <Loading size={20} />
      </section>
    );
  }

  const noAvailableRewardsMessage = (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <span>{ locale('text.no_rewards') }</span>
      <div className='flex flex-row items-center gap-1'>
        <span>{ locale('text.no_rewards_tip') }</span>
        <CreateRewardButton />
      </div>
    </section>
  );

  const noClaimedRewardsMessage = (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <span>{ locale('text.no_claimed_rewards') }</span>
    </section>
  );

  return (
    <section className='flex flex-col justify-center gap-10'>
      <div className='flex items-center justify-center rounded-md'>
        <StatusSelect model="reward" status={ rewardStatus } selectedStatus={ status } onClick={ (status) => updateSelectedStatus(status) } />
      </div>

      <div className='flex flex-wrap items-center justify-center gap-3'>
        { !rewards.length && status === RewardStatus.AVAILABLE ? noAvailableRewardsMessage : null }
        { !rewards.length && status === RewardStatus.CLAIMED ? noClaimedRewardsMessage : null }
        { rewards.map((reward) => <RewardCard key={ reward._id } reward={ reward } />) }
      </div>
    </section>
  );
}

function RewardCard(props: RewardCardProps) {
  const { toggleModal } = useContext(ModalContext);
  const { reward } = props;

  function openRewardModal(reward: Reward): void {
    const dialog = <RewardDialog rewardId={ reward._id } />;

    toggleModal(dialog);
  }

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
      <div className='flex items-center justify-center text-xl font-bold w-full h-14 cursor-pointer' onClick={ () => openRewardModal(reward) }>
        { formatedName(reward.name) }
      </div>

      <div className='flex items-center justify-center bg-slate-200 dark:bg-slate-600 rounded-lg text-sm break-words p-4 w-full h-20'>
        { formatedDescription(reward.description) }
      </div>

      <ClaimRewardButton value={ reward.value } rewardId={ reward._id } />
    </div>
  );
}
