import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root') as Element;

// const Modal = (): void => {
//   return;
// };

// const Modal = ({ onClose, children }): JSX.Element => {

const Modal = (): JSX.Element => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.code === 'Escape') {
        // onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    if ((event.currentTarget as HTMLElement) === (event.target as HTMLElement)) {
      // onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      {/* <div className={styles.content}>{children}</div> */}
      <div className={styles.content}>{34}</div>
    </div>,
    modalRoot,
  );
};
export default Modal;
