import Modal from '@/components/modal.component';
import { MapIcon } from '@heroicons/react/24/solid'
import { Quest, QuestDialogData } from '@/types/quest.type';
import Input from '@/components/input.component';
import Button from '@/components/button.component';
import { useContext, useState } from 'react';
import { ModalContext } from '@/contexts/modal.context';
import { questService } from '@/services/quest.service';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/snackbar.type';

export default function QuestDialog(props: QuestDialogData) {
  const { closeModal } = useContext(ModalContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<number>(100);
  const [date, setDate] = useState<string>('');
  const icon = <MapIcon className='h-5 w-5' />;
  const title = props.quest?.name || 'Nova Missão';

  async function save(event: React.FormEvent) {
    event.preventDefault();

    const quest = new Quest();

    quest.name = name;
    quest.value = value;
    quest.date = new Date(date);

    const newQuest = await questService.upsert(quest);

    if (newQuest) {
      openSnackbar('Missão criada com sucesso!', SnackbarType.SUCCESS);
      closeModal();
    } else {
      openSnackbar('Erro ao criar missão!', SnackbarType.ERROR);
    }
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
          label='Nome'
          type='string'
          required
          maxLength={ 50 }
          onChange={ (event) => setName(event.target.value) }
        />

        <div className='flex flex-row gap-4'>
          <Input
            id='quest_value'
            label='Valor'
            type='number'
            required
            onChange={ (event) => setQuestValue(Number(event.target.value)) }
          />

          <Input
            id='quest_date'
            label='Data'
            type='datetime-local'
            required
            onChange={ (event) => setDate(event.target.value) }
          />
        </div>

        <Button type='submit' label='CRIAR' primary />
      </form>
    </Modal>
  );
}