import Modal from '@/components/modal.component';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'

export default function Teste() {
  const icon = <ArrowDownCircleIcon className='h-5 w-5' />;

  return (
    <Modal title='Teste' icon={ icon }>
      <h1>Teste</h1>
    </Modal>
  );
}
