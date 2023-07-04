import React from 'react';
import styles from '../css/result.module.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        {children}
      </div>
    </div>
  );
};

export default Modal;