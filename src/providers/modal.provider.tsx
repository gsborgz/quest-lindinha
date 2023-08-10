'use client'

import { ModalContext } from "@/contexts/modal.context";
import { useState } from "react";
import { ModalContent } from "@type/modal.type";

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

  return (
    <ModalContext.Provider value={{ showModal, modalContent, toggleModal }}>
      { children }
    </ModalContext.Provider>
  );
}
