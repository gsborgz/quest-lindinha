import { PlusIcon } from '@heroicons/react/24/solid';
import QuestDialog from '@/dialogs/quest.dialog';
import Button from '@/components/button.component';
import { QuestButtonData } from '@/types/quest.type';
import { ModalContext } from '@/contexts/modal.context';
import { useContext } from 'react';

export function CreateQuestButton(props: QuestButtonData) {
  const { showModal, toggleModal } = useContext(ModalContext);
  const icon = <PlusIcon className='h-5 w-5 ml-[-4px] text-neutral-50' />

  function setModal() {
    if (!showModal) {
      const dialog = <QuestDialog quest={props.quest}  />;

      toggleModal(dialog);
    } else {
      toggleModal(null)
    }
  }

  return <Button icon={ icon } label='Missão' onClick={ setModal } primary />
}