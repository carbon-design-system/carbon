/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { warning } from '../../internal/warning';
import { ButtonKinds } from '../Button';
import { noopFn } from '../../internal/noopFn';
import { keys, match } from '../../internal/keyboard';

interface ModalWrapperProps {
  buttonTriggerClassName?: string;
  buttonTriggerText?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  handleOpen?: React.MouseEventHandler<HTMLButtonElement>;
  handleSubmit?: React.ReactEventHandler<HTMLElement>;
  id?: string;
  modalBeforeContent?: boolean;
  modalHeading?: string;
  modalLabel?: string;
  modalText?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  passiveModal?: boolean;
  preventCloseOnClickOutside?: boolean;
  primaryButtonText?: string;
  renderTriggerButtonIcon: React.ElementType;
  secondaryButtonText?: string;
  selectorPrimaryFocus?: string;
  shouldCloseAfterSubmit?: boolean;
  status?: string;
  triggerButtonIconDescription?: string;
  triggerButtonKind: (typeof ButtonKinds)[number];
  withHeader?: boolean;
}

interface ModelWrapperState {
  isOpen: boolean;
}

let didWarnAboutDeprecation = false;

export default class ModalWrapper extends React.Component<
  ModalWrapperProps,
  ModelWrapperState
> {
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

  triggerButton = React.createRef<HTMLButtonElement>();
  modal = React.createRef<HTMLDivElement>();

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const innerModal = this.modal.current?.querySelector('div');
    if (
      this.modal.current &&
      evt &&
      !innerModal?.contains(evt.target as Node) &&
      this.props.preventCloseOnClickOutside
    ) {
      return;
    } else {
      this.setState({ isOpen: false }, () =>
        this.triggerButton.current?.focus()
      );
    }
  };

  handleOnRequestSubmit = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const { handleSubmit, shouldCloseAfterSubmit } = this.props;

    if (handleSubmit && shouldCloseAfterSubmit) {
      handleSubmit(evt);
      this.handleClose(evt);
    }

    handleSubmit?.(evt);
  };

  render() {
    const {
      children,
      onKeyDown = noopFn,
      buttonTriggerText,
      buttonTriggerClassName,
      renderTriggerButtonIcon,
      primaryButtonText = 'Save',
      secondaryButtonText = 'Cancel',
      triggerButtonIconDescription = 'Provide icon description if icon is used',
      triggerButtonKind = 'primary',
      disabled = false,
      handleSubmit, // eslint-disable-line @typescript-eslint/no-unused-vars
      shouldCloseAfterSubmit = true, // eslint-disable-line @typescript-eslint/no-unused-vars
      selectorPrimaryFocus = '[data-modal-primary-focus]',
      preventCloseOnClickOutside = false, // eslint-disable-line @typescript-eslint/no-unused-vars
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
          if (match(evt, keys.Escape)) {
            this.handleClose(evt);
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
        <Modal
          ref={this.modal}
          primaryButtonText={primaryButtonText}
          secondaryButtonText={secondaryButtonText}
          {...props}>
          {children}
        </Modal>
      </div>
    );
  }
}
