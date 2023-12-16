'use client'

import { Quest, QuestCardProps, QuestStatus } from '@src/types/models/quest.type';
import { useContext, useEffect, useState } from 'react';
import { SnackbarType } from '@src/types/components/snackbar.type';
import { CreateQuestButton } from '@src/components/create-quest-button.component';
import Loading from '@src/components/loading.component';
import StatusSelect from '@src/components/status-select.component';
import QuestDialog from '@src/dialogs/quest.dialog';
import CompleteQuestButton from '@src/components/complete-quest-button.component';
import { SnackbarContext } from '@src/providers/snackbar.provider';
import { SessionContext } from '@src/providers/session.provider';
import { ModalContext } from '@src/providers/modal.provider';
import { useDictionary } from '@src/hooks/dictionary.hook';
import { useQuestService } from '@src/hooks/quest-service.hook';

export default function Dashboard() {
  const questService = useQuestService();
  const { locale } = useDictionary();
  const { openSnackbar } = useContext(SnackbarContext);
  const { loadQuests, setLoadQuests } = useContext(SessionContext);
  const [mounted, setMounted] = useState<boolean>(false);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [status, setStatus] = useState<QuestStatus>(QuestStatus.PENDING);
  const [loading, setLoading] = useState<boolean>(true);
  const questStatus = [QuestStatus.PENDING, QuestStatus.COMPLETED];

  async function findQuests() {
    await questService.findAll({ status })
      .then((quests) => {
        setQuests(quests || []);
      })
      .catch(() => {
        openSnackbar(locale('text.load_quests_fail'), SnackbarType.ERROR);
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
      <span>{ locale('text.no_quests') }</span>
      <div className='flex flex-row items-center gap-1'>
        <span>{ locale('text.create_quest_tip') }</span>
        <CreateQuestButton />
      </div>
    </section>
  );

  const noCompletedQuestsMessage = (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <span>{ locale('text.no_completed_quests') }</span>
    </section>
  );

  return (
    <section className='flex flex-col justify-center gap-10'>
      <div className='flex items-center justify-center rounded-md'>
        <StatusSelect model="quest" status={ questStatus } selectedStatus={ status } onClick={ (status) => updateSelectedStatus(status) } />
      </div>

      <section className='flex flex-wrap items-center justify-center gap-10'>
        { !quests.length && status === QuestStatus.PENDING ? noPendingQuestsMessage : null }
        { !quests.length && status === QuestStatus.COMPLETED ? noCompletedQuestsMessage : null }
        { quests.map((quest) => <QuestCard key={ quest._id } quest={ quest } />) }
      </section>
    </section>
  );
}

function QuestCard(props: QuestCardProps) {
  const { toggleModal } = useContext(ModalContext);
  const { locale } = useDictionary();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [updateTimeLeftFirstTime, setUpdateTimeLeftFirstTime] = useState<boolean>(true);
  const { quest } = props;

  if (updateTimeLeftFirstTime) {
    setTimeLeftValue(quest.date);
    setUpdateTimeLeftFirstTime(false);
  }

  updateTimeLeft(quest.date);

  function openQuestModal(quest: Quest): void {
    const dialog = <QuestDialog questId={ quest._id } />;

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

  function updateTimeLeft(date: Date): void {
    setInterval(() => {
      setTimeLeftValue(date);
    }, 1000);
  }

  function setTimeLeftValue(date: Date): void {
    let timeLeft = '';

    const now = new Date();
    const questDate = new Date(date);
    const distance = questDate.getTime() - now.getTime();
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days > 1) {
      timeLeft += `${days} ${locale('text.days_remaining').toLowerCase()}`;
    } else if (days === 1) {
      timeLeft += `${days} ${locale('text.day_remaining').toLowerCase()}`;
    } else if (hours > 1 && days < 1) {
      timeLeft += `${hours} ${locale('text.hours_remaining').toLowerCase()}`;
    } else if (hours === 1 && days < 1) {
      timeLeft += `${hours} ${locale('text.hour_remaining').toLowerCase()}`;
    } else if (minutes > 1 && hours < 1) {
      timeLeft += `${minutes} ${locale('text.minutes_remaining').toLowerCase()}`;
    } else if (minutes === 1 && hours < 1) {
      timeLeft += `${minutes} ${locale('text.minute_remaining').toLowerCase()}`;
    } else if (seconds > 1 && minutes < 1) {
      timeLeft += `${seconds} ${locale('text.seconds_remaining').toLowerCase()}`;
    } else if (seconds === 1 && minutes < 1) {
      timeLeft += `${seconds} ${locale('text.second_remaining').toLowerCase()}`;
    } else {
      timeLeft = locale('text.expired');
    }

    setTimeLeft(timeLeft);
  }

  return (
    <div className='flex flex-col items-center justify-center w-60 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg gap-4'>
      <div className='flex flex-col items-center justify-center w-full h-14 cursor-pointer gap-1' onClick={ () => openQuestModal(quest) }>
        <span className='text-xs text-slate-400 dark:text-slate-400'>{ quest.date && quest.status === QuestStatus.PENDING ? timeLeft : null }</span>
        <span className='text-xl font-bold'>{ formatedName(quest.name) }</span>
      </div>

      { quest.status === QuestStatus.PENDING ? (
        <CompleteQuestButton value={ quest.value } questId={ quest._id } />
      ) : null }
    </div>
  );
}

