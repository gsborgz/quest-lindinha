'use client'

import { LifebuoyIcon } from '@heroicons/react/24/solid';
import { SnackbarType } from '@src/types/components/snackbar.type';
import { CompleteQuestButtonProps } from '@src/types/models/quest.type';
import { useContext } from 'react';
import { SnackbarContext } from '@src/providers/snackbar.provider';
import { SessionContext } from '@src/providers/session.provider';
import { useDictionary } from '../hooks/dictionary.hook';
import { useQuestService } from '../hooks/quest-service.hook';

export default function CompleteQuestButton(props: CompleteQuestButtonProps) {
  const questService = useQuestService();
  const { locale } = useDictionary();
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoadQuests, addCredits } = useContext(SessionContext);

  function completeQuest() {
    questService.complete(props.questId)
      .then(() => {
        openSnackbar(locale('text.mission_accomplished'), SnackbarType.SUCCESS);
        addCredits(props.value);

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
        <LifebuoyIcon className='h-6 w-6 text-neutral-50' />
        { props.value }
      </span>
    </button>
  );
}