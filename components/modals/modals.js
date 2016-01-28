const Modal = () => {

  const modal = document.querySelector('.modal');
  const transactionalButton = document.querySelector('.buttons__transactional');
  const passiveButton = document.querySelector('.buttons__passive');
  const transactionalModal = document.querySelector('.modal--transactional');
  const passiveModal = document.querySelector('.modal--passive');
  const cancelButton = document.querySelector('.buttons__cancel');
  const closeButton = document.querySelector('.modal__close');

  const showModal = (modal, button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.toggle('modal-visible');

      if (modal == passiveModal) {
        document.onkeydown = function(e) {
          if (e.keyCode == 27) {
           passiveModal.classList.remove('modal-visible');
          }
        }
      }
    });
  };

  const hideModal = (...buttons) => {
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        let selected = document.querySelector('.modal-visible');
        if (selected) {
          selected.classList.toggle('modal-visible');
        }
      });
    });
  };

  if (passiveButton) {
    showModal(passiveModal, passiveButton);
  }

  if (transactionalModal) {
    showModal(transactionalModal, transactionalButton);
  }

  hideModal(cancelButton, closeButton);

};

export default Modal;
