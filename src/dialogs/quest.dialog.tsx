import Modal from '@/components/modal.component';
import { MapIcon } from '@heroicons/react/24/solid'
import { Quest, QuestDialogData, QuestStatus } from '@/types/models/quest.type';
import Input from '@/components/input.component';
import Button from '@/components/button.component';
import { useContext, useState } from 'react';
import { ModalContext } from '@/contexts/modal.context';
import { questService } from '@/services/quest.service';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/components/snackbar.type';
import { SessionContext } from '@/contexts/session.context';
import { DictionaryContext } from '@/contexts/dictionary.context';

export default function QuestDialog(props: QuestDialogData) {
  const { locale } = useContext(DictionaryContext);
  const { closeModal } = useContext(ModalContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoadQuests } = useContext(SessionContext);
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<number>(100);
  const [date, setDate] = useState<string>('');
  const icon = <MapIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const title = props.quest?.name || locale('text.new_quest');

  function save(event: React.FormEvent) {
    event.preventDefault();

    const quest = new Quest();

    quest.name = name;
    quest.value = value;
    quest.date = new Date(date);

    if (props.quest?._id) {
      quest._id = props.quest?._id;
      quest.status = props.quest?.status;
    } else {
      quest.status = QuestStatus.PENDING;
    }

    questService.upsert(quest)
      .then(() => {
        openSnackbar(locale('text.mission_created'), SnackbarType.SUCCESS);
        closeModal();
        setLoadQuests(true);
      })
      .catch(() => {
        openSnackbar(locale('text.mission_creation_fail'), SnackbarType.ERROR);
      });
  }

  function setQuestValue(value: number) {
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
          id='quest_name'
          label={ locale('text.name') }
          type='string'
          required
          maxLength={ 50 }
          onChange={ (event) => setName(event.target.value) }
        />

        <div className='flex flex-row gap-4'>
          <Input
            id='quest_value'
            label={ locale('text.value') }
            type='number'
            required
            onChange={ (event) => setQuestValue(Number(event.target.value)) }
          />

          <Input
            id='quest_date'
            label={ locale('text.date') }
            type='datetime-local'
            required
            onChange={ (event) => setDate(event.target.value) }
          />
        </div>

        <Button type='submit' label={ locale('text.create') } primary />
      </form>
    </Modal>
  );
}