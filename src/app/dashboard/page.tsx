'use client'

import { Quest, QuestCardProps, QuestStatus } from '@/types/models/quest.type';
import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SessionContext } from '@/contexts/session.context';
import { questService } from '@/services/quest.service';
import { SnackbarType } from '@/types/components/snackbar.type';
import { CreateQuestButton } from '@/components/create-quest-button.component';
import Loading from '@/components/loading.component';
import StatusSelect from '@/components/status-select.component';
import { DictionaryContext } from '@/contexts/dictionary.context';
import { ModalContext } from '@/contexts/modal.context';
import QuestDialog from '@/dialogs/quest.dialog';
import CompleteQuestButton from '@/components/complete-quest-button.component';

export default function Dashboard() {
  const { locale } = useContext(DictionaryContext);
  const [mounted, setMounted] = useState<boolean>(false);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [status, setStatus] = useState<QuestStatus>(QuestStatus.PENDING);
  const [loading, setLoading] = useState<boolean>(true);
  const { openSnackbar } = useContext(SnackbarContext);
  const { loadQuests, setLoadQuests } = useContext(SessionContext);
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
  const { quest } = props;

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

  return (
    <div className='flex flex-col items-center justify-center w-60 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg gap-4'>
      <div className='flex items-center justify-center text-xl font-bold w-full h-14 cursor-pointer' onClick={ () => openQuestModal(quest) }>
        { formatedName(quest.name) }
      </div>

      { quest.status === QuestStatus.PENDING ? (
        <CompleteQuestButton value={ quest.value } questId={ quest._id } />
      ) : null }
    </div>
  );
}

