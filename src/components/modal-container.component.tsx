'use client'

import { useContext } from 'react';
import { ModalContext } from '@contexts/modal.context';

export default function ModalContainer() {
  const { showModal, modalContent } = useContext(ModalContext);

  return (
    <>
      { showModal && modalContent ? (
        <section className='container fixed z-30 flex items-center justify-center h-full w-full'>
          { modalContent }
        </section>
      ) : <></> }
    </>
  );
}
