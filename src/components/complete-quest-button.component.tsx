'use client'

import { LifebuoyIcon } from '@heroicons/react/24/solid';
import { DictionaryContext } from '@/contexts/dictionary.context';
import { SessionContext } from '@/contexts/session.context';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/components/snackbar.type';
import { CompleteQuestButtonProps } from '@/types/models/quest.type';
import { questService } from '@/services/quest.service';
import { useContext } from 'react';

export default function CompleteQuestButton(props: CompleteQuestButtonProps) {
  const { locale } = useContext(DictionaryContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoadQuests } = useContext(SessionContext);

  function completeQuest() {
    questService.complete(props.questId)
      .then(() => {
        openSnackbar(locale('text.mission_accomplished'), SnackbarType.SUCCESS);

        if (props.addAction) {
          props.addAction();
        }
      })
      .catch(() => {
        openSnackbar(locale('text.mission_accomplishment_fail'), SnackbarType.ERROR);
      })
      .finally(() => {
        setLoadQuests(true);
      });
  }

  return (
    <button type='button' onClick={ completeQuest } className='flex flex-col items-center justify-center gap-2 text-slate-50 bg-sky-400 rounded-md p-3 w-full'>
      <span className='text-xs font-bold'>{ locale('text.accomplish') }</span>

      <span className='text-lg font-bold flex items-center justify-center gap-2'>
        <LifebuoyIcon className='h-6 w-6 text-slate-700 dark:text-neutral-50' />
        { props.value }
      </span>
    </button>
  );
}