'use client'

import { useState } from 'react';
import { ModalContext } from '@/contexts/modal.context';
import { ModalContent } from '@/types/components/modal.type';

export default function ModalProvider({ children }: { children: React.ReactNode }) {
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
