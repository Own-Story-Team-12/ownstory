import React from 'react';
import styles from '../css/login.module.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <button className={styles.close}onclick={onClose}> 
        X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;