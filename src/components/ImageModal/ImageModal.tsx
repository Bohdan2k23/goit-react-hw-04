import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ src,onClose, isOpen }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Image Modal"
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <div className={css.wrapper}>
          <img
            className={css.image}
            src={src}
          />
        </div>
      </Modal>
    </div>
  );
};
