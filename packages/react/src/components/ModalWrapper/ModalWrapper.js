/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { ButtonKinds } from '../../prop-types/types';

export default class ModalWrapper extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    handleOpen: PropTypes.func,
    children: PropTypes.node,
    id: PropTypes.string,
    buttonTriggerText: PropTypes.node,
    buttonTriggerClassName: PropTypes.string,
    modalLabel: PropTypes.string,
    modalHeading: PropTypes.string,
    modalText: PropTypes.string,
    passiveModal: PropTypes.bool,
    withHeader: PropTypes.bool,
    modalBeforeContent: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    renderTriggerButtonIcon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    triggerButtonIconDescription: PropTypes.string,
    triggerButtonKind: PropTypes.oneOf(ButtonKinds),
    shouldCloseAfterSubmit: PropTypes.bool,
  };

  static defaultProps = {
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
    triggerButtonIconDescription: 'Provide icon description if icon is used',
    triggerButtonKind: 'primary',
    disabled: false,
    selectorPrimaryFocus: '[data-modal-primary-focus]',
    onKeyDown: () => {},
  };

  triggerButton = React.createRef();
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({ isOpen: false }, () => this.triggerButton.current.focus());
  };

  handleOnRequestSubmit = () => {
    const { handleSubmit, shouldCloseAfterSubmit } = this.props;

    if (handleSubmit()) {
      if (shouldCloseAfterSubmit) {
        this.handleClose();
      }
    }
  };

  render() {
    const {
      children,
      onKeyDown,
      buttonTriggerText,
      buttonTriggerClassName,
      renderTriggerButtonIcon,
      triggerButtonIconDescription,
      triggerButtonKind,
      disabled,
      handleSubmit, // eslint-disable-line no-unused-vars
      shouldCloseAfterSubmit, // eslint-disable-line no-unused-vars
      selectorPrimaryFocus,
      ...other
    } = this.props;

    const props = {
      ...other,
      selectorPrimaryFocus,
      open: this.state.isOpen,
      onRequestClose: this.handleClose,
      onRequestSubmit: this.handleOnRequestSubmit,
    };

    return (
      <div
        role="presentation"
        onKeyDown={evt => {
          if (evt.which === 27) {
            this.handleClose();
            onKeyDown(evt);
          }
        }}>
        <Button
          className={buttonTriggerClassName}
          disabled={disabled}
          kind={triggerButtonKind}
          renderIcon={renderTriggerButtonIcon}
          iconDescription={triggerButtonIconDescription}
          onClick={this.handleOpen}
          ref={this.triggerButton}>
          {buttonTriggerText}
        </Button>
        <Modal {...props}>{children}</Modal>
      </div>
    );
  }
}
