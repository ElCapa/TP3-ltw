import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, children, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal(); // Abre o modal
    } else {
      dialog.current?.close(); // Fecha o modal
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;