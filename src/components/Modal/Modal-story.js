import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from '../Modal';

const modalProps = {
  onBlur: action('onBlur'),
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  className: 'some-class',
};

storiesOf('Modal', module)
  .addWithInfo(
    'transactional',
    `
      Modals communicate information via a secondary window and allow the user to maintain the context of a particular task.
      Use the Modal Wrapper component to encapsulate your Modal within a button.
    `,
    () => (
      <Modal
        {...modalProps}
        open
        modalHeading="Modal heading"
        modalLabel="Optional label"
        primaryButtonText="Primary Button"
        secondaryButtonText="Secondary Button">
        <p className="bx--modal-content__text">
          Please see ModalWrapper for more examples and demo of the
          functionality.
        </p>
      </Modal>
    )
  )
  .addWithInfo(
    'passive',
    `
      Passive modals are modals without footers. Add passiveModal prop or set to true to render passive modal.
    `,
    () => (
      <Modal
        {...modalProps}
        open
        passiveModal
        modalHeading="Modal heading"
        modalLabel="Optional label"
        primaryButtonText="Primary Button"
        secondaryButtonText="Secondary Button">
        <p className="bx--modal-content__text">
          Please see ModalWrapper for more examples and demo of the
          functionality.
        </p>
      </Modal>
    )
  )
  .addWithInfo(
    'danger',
    `
      For dangerous situations.
    `,
    () => (
      <Modal
        {...modalProps}
        danger
        open
        modalHeading="Modal heading"
        modalLabel="Optional label"
        primaryButtonText="Primary Button"
        secondaryButtonText="Secondary Button">
        <p className="bx--modal-content__text">
          Please see ModalWrapper for more examples and demo of the
          functionality.
        </p>
      </Modal>
    )
  );
