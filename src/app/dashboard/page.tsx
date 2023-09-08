'use client'

import { CompleteQuestButtonProps, Quest, QuestCardProps, QuestStatus } from '@/types/models/quest.type';
import { useContext, useEffect, useState } from 'react';
import { LifebuoyIcon } from '@heroicons/react/24/solid';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SessionContext } from '@/contexts/session.context';
import { questService } from '@/services/quest.service';
import { SnackbarType } from '@/types/components/snackbar.type';
import { CreateQuestButton } from '@/components/create-quest-button.component';
import Loading from '@/components/loading.component';
import StatusSelect from '../../components/status-select.component';

export default function Dashboard() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [status, setStatus] = useState<QuestStatus>(QuestStatus.PENDING);
  const [loading, setLoading] = useState<boolean>(true);
  const questStatus = [QuestStatus.PENDING, QuestStatus.COMPLETED, QuestStatus.CANCELED];
  const { openSnackbar } = useContext(SnackbarContext);
  const { loadQuests, setLoadQuests } = useContext(SessionContext);

  async function findQuests() {
    await questService.findAll({ status })
      .then((quests) => {
        setQuests(quests || []);
      })
      .catch(() => {
        openSnackbar('Erro ao carregar missões!', SnackbarType.ERROR);
      })
      .finally(() => {
        setLoadQuests(false);
      });
  }

  async function init() {
    await findQuests();

    setLoading(false);
  }

  function updateSelectedStatus(status: QuestStatus) {
    setStatus(status);
    setLoadQuests(true);
  }

  useEffect(() => {
    setMounted(true);
    setLoadQuests(true);
  }, [setLoadQuests]);

  if (mounted && loadQuests) {
    init();
  }

  if (loading) {
    return (
      <section className='flex flex-wrap items-center justify-center h-[93%]'>
        <Loading size={20} />
      </section>
    );
  }

  const noPendingQuestsMessage = (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <span>Você não possui missões para completar</span>
      <div className='flex flex-row items-center gap-1'>
        <span>Experimente criar uma clicando nesse botão:</span>
        <CreateQuestButton />
      </div>
    </section>
  );

  const noCompletedQuestsMessage = (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <span>Você não possui missões completas</span>
    </section>
  );

  const noCanceledQuestsMessage = (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <span>Você não possui missões canceladas</span>
    </section>
  );

  return (
    <section className='flex flex-col justify-center gap-10'>
      <div className='flex items-center justify-center rounded-md'>
        <StatusSelect status={ questStatus } selectedStatus={ status } onClick={ (status) => updateSelectedStatus(status) } />
      </div>

      <section className='flex flex-wrap items-center justify-center gap-10'>
        { !quests.length && status === QuestStatus.PENDING ? noPendingQuestsMessage : null }
        { !quests.length && status === QuestStatus.COMPLETED ? noCompletedQuestsMessage : null }
        { !quests.length && status === QuestStatus.CANCELED ? noCanceledQuestsMessage : null }
        { quests.map((quest) => <QuestCard key={ quest._id } quest={ quest } />) }
      </section>
    </section>
  );
}

function QuestCard(props: QuestCardProps) {
  const { quest } = props;

  function formatedName(name: string) {
    if (name.length <= 30) {
      return name;
    }

    if (!name.substring(0, 10).includes(' ')) {
      return `${ name.substring(0, 7) }...`;
    }

    return `${ name.substring(0, 27) }...`;
  }

  return (
    <div className='flex flex-col items-center justify-center w-60 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg gap-4'>
      <div className='flex items-center justify-center text-xl font-bold w-full h-14'>
        { formatedName(quest.name) }
      </div>

      <CompleteQuestButton value={ quest.value } questId={ quest._id } />
    </div>
  );
}

function CompleteQuestButton(props: CompleteQuestButtonProps) {
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoadQuests } = useContext(SessionContext);

  function completeQuest() {
    questService.complete(props.questId)
      .then(() => {
        openSnackbar('Missão completa!', SnackbarType.SUCCESS);
      })
      .catch(() => {
        openSnackbar('Erro ao completar missão!', SnackbarType.ERROR);
      })
      .finally(() => {
        setLoadQuests(true);
      });
  }

  return (
    <button type="button" onClick={ completeQuest } className='flex flex-col items-center justify-center gap-2 text-slate-50 bg-sky-400 rounded-md p-3 w-full'>
      <span className='text-xs font-bold'>COMPLETAR</span>

      <span className='text-lg font-bold flex items-center justify-center gap-2'>
        <LifebuoyIcon className='h-6 w-6 text-slate-700 dark:text-neutral-50' />
        { props.value }
      </span>
    </button>
  );
}