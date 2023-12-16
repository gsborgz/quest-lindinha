'use client'

import { useState } from 'react';
import { ModalContent } from '@src/types/components/modal.type';
import { createContext } from 'react';
import { ModalData } from '@src/types/components/modal.type';

export const ModalContext = createContext({} as ModalData);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  function toggleModal(content: ModalContent) {
    const mustShow = !showModal;

    if (!content) {
      setShowModal(false);
    } else {
      setShowModal(mustShow);
    }

    if (!mustShow) {
      setModalContent(null);
    } else {
      setModalContent(content);
    }
  }

  function closeModal() {
    setShowModal(false);
    setModalContent(null);
  }

  return (
    <ModalContext.Provider value={{ showModal, modalContent, toggleModal, closeModal }}>
      { children }
    </ModalContext.Provider>
  );
}
