/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { ButtonKinds } from '../../prop-types/types';
import { warning } from '../../internal/warning';

let didWarnAboutDeprecation = false;

export default class ModalWrapper extends React.Component {
  if(__DEV__) {
    warning(
      didWarnAboutDeprecation,
      '`<ModalWrapper>` has been deprecated in favor of `<ComposedModal/>` and will be removed in the next major version, `@carbon/react@v2.x`'
    );
    didWarnAboutDeprecation = true;
  }

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
    shouldCloseAfterSubmit: true,
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
    const innerModal = this.modal.current.querySelector('div');
    if (
      this.modal.current &&
      evt &&
      !innerModal.contains(evt.target) &&
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

    if (handleSubmit && shouldCloseAfterSubmit) {
      handleSubmit();
      this.handleClose();
    }

    handleSubmit();
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
