import { PropsWithChildren, useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ModalProps } from '@/types/components/modal.type';
import { ModalContext } from '@/contexts/modal.context';

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className='min-w-[30%] max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-700 p-5'>
      <section className='flex flex-row items-center justify-between mb-4'>
        <div className='flex flex-row items-center'>
          { props.icon }

          <h1 className='ml-2'>{ props.title }</h1>
        </div>

        <XCircleIcon className='h-5 w-5 cursor-pointer' onClick={ () => toggleModal(null) } />
      </section>

      <section className='flex flex-row flex-wrap justify-between'>
        { props.children }
      </section>
    </div>
  );
}
