'use client'

import Modal from '@/components/modal.component';
import { MapIcon } from '@heroicons/react/24/solid'
import { Quest, QuestDialogData, QuestStatus } from '@/types/models/quest.type';
import Input from '@/components/input.component';
import Button from '@/components/button.component';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '@/contexts/modal.context';
import { questService } from '@/services/quest.service';
import { SnackbarContext } from '@/contexts/snackbar.context';
import { SnackbarType } from '@/types/components/snackbar.type';
import { SessionContext } from '@/contexts/session.context';
import { DictionaryContext } from '@/contexts/dictionary.context';
import CompleteQuestButton from '@/components/complete-quest-button.component';
import Divider from '../components/divider.component';

export default function QuestDialog(props: QuestDialogData) {
  const { locale } = useContext(DictionaryContext);
  const { closeModal } = useContext(ModalContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoadQuests } = useContext(SessionContext);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<number>(100);
  const [date, setDate] = useState<string>('');
  const [quest, setQuest] = useState<Quest | null>(null);
  const [disableFields, setDisableFields] = useState<boolean>(false);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const icon = <MapIcon className='h-5 w-5 text-slate-700 dark:text-neutral-50' />;
  const title = props.questId ? locale('text.quest_details') : locale('text.new_quest');

  useEffect(() => {
    if (props.questId && !quest) {
      questService.findOne(props.questId).then((response) => {
        setQuest(response);

        if (response.status === QuestStatus.COMPLETED) {
          setDisableFields(true);
        }

        const dateValue = new Date(response.date);
        const formatedDate = new Date(Date.UTC(
          dateValue.getFullYear(),
          dateValue.getMonth(),
          dateValue.getDate(),
          dateValue.getHours(),
          dateValue.getMinutes()
        )).toISOString().slice(0, 16);

        setName(response.name);
        setDescription(response.description);
        setValue(response.value);
        setDate(formatedDate);
      });
    }
  }, [props, quest]);

  if (props.questId && !quest) {
    return null;
  }

  function setQuestName(newValue: string): void {
    setName(newValue);

    if (props.questId) {
      edit(newValue, description, value, date);
    }
  }

  function setQuestDescription(newValue: string): void {
    setDescription(newValue);

    if (props.questId) {
      edit(name, newValue, value, date);
    }
  }

  function setQuestValue(newValue: number): void {
    if (newValue < 1) {
      setValue(1);
    } else {
      setValue(newValue);
    }

    if (props.questId) {
      edit(name, description, newValue, date);
    }
  }

  function setQuestDate(newValue: string): void {
    setDate(newValue);

    if (props.questId) {
      edit(name, description, value, newValue);
    }
  }

  function save(event?: React.FormEvent): void {
    if (event) {
      event.preventDefault();
    }

    const quest = new Quest();

    quest.name = name;
    quest.description = description;
    quest.value = value;
    quest.date = new Date(date);
    quest.status = QuestStatus.PENDING;

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

  function edit(newName: string, newDescription: string, newValue: number, newDate: string): void {
    const quest = new Quest();

    quest.name = newName;
    quest.description = newDescription;
    quest.value = newValue;
    quest.date = new Date(newDate);
    quest.status = QuestStatus.PENDING;
    quest._id = props.questId as string;

    questService.upsert(quest)
      .then(() => {
        openSnackbar(locale('text.mission_updated'), SnackbarType.SUCCESS);
        setLoadQuests(true);
      })
      .catch(() => {
        openSnackbar(locale('text.mission_update_fail'), SnackbarType.ERROR);
      });
  }

  function removeQuest(): void {
    questService.remove(props.questId as string)
      .then(() => {
        openSnackbar(locale('text.mission_deleted'), SnackbarType.SUCCESS);
        closeModal();
        setLoadQuests(true);
      })
      .catch(() => {
        openSnackbar(locale('text.mission_delete_fail'), SnackbarType.ERROR);
      });
  }

  return (
    <Modal title={ title } icon={ icon }>
      <form className='flex flex-col gap-8 w-full' onSubmit={ save }>
        <Input
          id='quest_name'
          label={ locale('text.name') }
          type='string'
          initialValue={ name }
          required
          disabled={ disableFields }
          maxLength={ 50 }
          onChange={ (event) => setQuestName(event.target.value) }
        />

        <Input
          id='quest_description'
          label={ locale('text.description') }
          type='string'
          initialValue={ description }
          required
          disabled={ disableFields }
          maxLength={ 200 }
          onChange={ (event) => setQuestDescription(event.target.value) }
        />

        <div className='flex flex-row gap-4'>
          <Input
            id='quest_value'
            label={ locale('text.value') }
            type='number'
            initialValue={ value }
            required
            disabled={ disableFields }
            onChange={ (event) => setQuestValue(Number(event.target.value)) }
          />

          <Input
            id='quest_date'
            label={ locale('text.date') }
            type='datetime-local'
            initialValue={ date }
            required
            disabled={ disableFields }
            onChange={ (event) => setQuestDate(event.target.value) }
          />
        </div>

        { props.questId && quest ? quest.status === QuestStatus.PENDING ? (
          <>
            <CompleteQuestButton value={ quest.value } questId={ quest._id } addAction={ closeModal } />

            { !showDeleteButton ? (
              <Divider text={ locale('text.show_more') } onClick={ () => setShowDeleteButton(true) } />
            ) : (
              <Divider text={ locale('text.show_less') } onClick={ () => setShowDeleteButton(false) } />
            ) }

            { showDeleteButton ? (
              <Button type='button' bgColor='bg-red-500' label={ locale('text.cancel') } onClick={ () => removeQuest() } />
            ) : null }
          </>
        ) : null : (
          <Button type='submit' label={ locale('text.create') } primary />
        ) }
      </form>
    </Modal>
  );
}