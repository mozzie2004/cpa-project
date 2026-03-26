import { useState, useRef, useEffect, type ReactNode, type FC } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Form from '@components/Form';
import styles from './ModalProvider.module.scss';
import CloseIcon from '@assets/icons/close-icon.svg?react';
import LogoIcon from '@assets/icons/logo.svg?react';
import type { ModalKey, ModalRegistry } from './types';
import { ModalContext } from './ModalContext';
import ModalInfo from '@components/ModalInfo';

type ModalState<K extends ModalKey = ModalKey> = {
  key: K;
  props: ModalRegistry[K];
};

const modalComponents: {
  [K in ModalKey]: FC<ModalRegistry[K] & { onClose: () => void }>;
} = {
  form: Form,
  info: ModalInfo
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalState | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (key: ModalKey, props: Record<string, unknown>) => {
    setModal({ key, props });
    setIsVisible(true);
  };

  const closeModal = () => {
    if (!overlayRef.current || !modalRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setModal(null);
      }
    });

    tl.to(modalRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      ease: 'power2.in'
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2
      },
      0
    );
  };

  useEffect(() => {
    if (!isVisible || !overlayRef.current || !modalRef.current) return;

    const tl = gsap.timeline();

    tl.set(overlayRef.current, { opacity: 0 });
    tl.set(modalRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.95
    });

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.2
    }).to(
      modalRef.current,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power3.out'
      },
      0
    );
  }, [isVisible]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isVisible) {
      window.addEventListener('keydown', handler);
    }

    return () => window.removeEventListener('keydown', handler);
  }, [isVisible]);

  const CurrentModal = modal ? modalComponents[modal.key] : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal &&
        CurrentModal &&
        createPortal(
          <div ref={overlayRef} className={styles.overlay} onClick={closeModal}>
            <div
              ref={modalRef}
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModal} className={styles.modal__close}>
                <CloseIcon />
              </button>
              <div className={styles.modal__logo}>
                <LogoIcon />
              </div>
              <CurrentModal {...modal.props} onClose={closeModal} />
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};
