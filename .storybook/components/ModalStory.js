import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Modal from '../../components/Modal';

const modalProps = {
  onBlur: action('onBlur'),
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  onMouseDown: action('onMouseDown'),
  onMouseEnter: action('onMouseEnter'),
  onMouseLeave: action('onMouseLeave'),
  onMouseUp: action('onMouseUp'),
  className: 'some-class',
};

storiesOf('Modal', module)
  .addWithInfo(
    '',
    `
      Modals communicate information via a secondary window and allow the user to maintain the context of a particular task.
      Use the Modal Wrapper component to encapsulate your Modal within a button.
    `,
    () => (
      <Modal
        {...modalProps}
        open
        modalHeading="Modal Example"
        modalLabel="Optional Label"
        primaryButtonText="Primary Button"
        secondaryButtonText="Secondary Button"
      >
        <p className="bx--modal-content__text">Please see ModalWrapper for more examples and demo of the functionality.</p>
      </Modal>
  ));
