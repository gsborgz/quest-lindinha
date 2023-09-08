export type ModalData = {
  showModal: boolean;
  modalContent: ModalContent;
  toggleModal: (content: ModalContent) => void;
  closeModal: () => void;
}

export type ModalContent = React.ReactNode | JSX.Element | null;

export type ModalProps = {
  title: string;
  icon: JSX.Element;
}