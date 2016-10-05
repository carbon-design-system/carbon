import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';
import Modal from '../../components/Modal';
import AppContainer from '../../containers/AppContainer';

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
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addDecorator(centered)
  .add('modal', () => (
    <Modal
      modalProps={modalProps}
      open="true"
      modalHeading="Modal Example"
      modalLabel="Optional Label"
      primaryButtonText="Primary Button"
      secondaryButtonText="Secondary Button"
    >
      <p className="bx--modal-content__text">Please see ModalWrapper for more examples and demo of the functionality.</p>
    </Modal>
  ));
