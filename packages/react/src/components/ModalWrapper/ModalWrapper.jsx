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
    buttonTriggerClassName: PropTypes.string,
    buttonTriggerText: PropTypes.node,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.string,
    modalBeforeContent: PropTypes.bool,
    modalHeading: PropTypes.string,
    modalLabel: PropTypes.string,
    modalText: PropTypes.string,
    onKeyDown: PropTypes.func,
    passiveModal: PropTypes.bool,
    preventCloseOnClickOutside: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    renderTriggerButtonIcon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    secondaryButtonText: PropTypes.string,
    selectorPrimaryFocus: PropTypes.string,
    shouldCloseAfterSubmit: PropTypes.bool,
    status: PropTypes.string,
    triggerButtonIconDescription: PropTypes.string,
    triggerButtonKind: PropTypes.oneOf(ButtonKinds),
    withHeader: PropTypes.bool,
  };

  static defaultProps = {
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
    triggerButtonIconDescription: 'Provide icon description if icon is used',
    triggerButtonKind: 'primary',
    disabled: false,
    preventCloseOnClickOutside: false,
    selectorPrimaryFocus: '[data-modal-primary-focus]',
    onKeyDown: () => {},
  };

  triggerButton = React.createRef();
  modal = React.createRef();

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = (evt) => {
    if (
      evt &&
      !this.modal.current.innerModal.current.contains(evt.target) &&
      this.props.preventCloseOnClickOutside
    ) {
      return;
    } else {
      this.setState({ isOpen: false }, () =>
        this.triggerButton.current.focus()
      );
    }
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
      preventCloseOnClickOutside, // eslint-disable-line no-unused-vars
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
        onKeyDown={(evt) => {
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
        <Modal ref={this.modal} {...props}>
          {children}
        </Modal>
      </div>
    );
  }
}
