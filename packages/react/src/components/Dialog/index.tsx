/**
 * Copyright IBM Corp. 2014, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
  type HTMLAttributes,
  type MutableRefObject,
} from 'react';
import { usePrefix } from '../../internal/usePrefix';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';

export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  /**
   * Provide the contents of the Dialog
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Specifies whether the dialog is modal or non-modal. This cannot be changed
   * while open=true
   */
  modal?: boolean;

  /**
   * Specify a handler for the dialog's cancel event.
   * The browser fires this event when the user presses the Esc key and is cancelable.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a click handler applied to the dialog.
   */
  onClick?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a handler the dialog's close event.
   * The browser fires this event after the dialog has closed.
   */
  onClose?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a handler for closing Dialog.
   * The handler should care of closing Dialog, e.g. changing `open` prop.
   */
  onRequestClose?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify whether the Dialog is currently open
   */
  open?: boolean;
}

export const unstable__Dialog = React.forwardRef(
  (
    {
      children,
      className,
      modal,
      onCancel = noopFn,
      onClick = noopFn,
      onClose = noopFn,
      onRequestClose = noopFn,
      open = false,
      ...rest
    }: DialogProps,
    forwardRef
  ) => {
    const prefix = usePrefix();

    // This component needs access to a ref, placed on the dialog, to call the
    // various imperative dialog functions (show(), close(), etc.).
    // If the parent component has not passed a ref for forwardRef, forwardRef
    // will be null. A "backup" ref is needed to ensure the dialog's instance
    // methods can always be called within this component.
    const backupRef = useRef<HTMLDialogElement>(null);
    const ref = (forwardRef ??
      backupRef) as MutableRefObject<HTMLDialogElement>;

    // Clicks on the backdrop of an open modal dialog should request the consuming component to close
    // the dialog. Clicks elsewhere, or on non-modal dialogs should not request
    // to close the dialog.
    function handleModalBackdropClick(e) {
      if (open && modal && e.target === ref.current) {
        onRequestClose(e);
      }
    }

    function handleClick(e) {
      handleModalBackdropClick(e);

      // onClick should always be called, no matter if the target is a modal
      // dialog, modal dialog backdrop, or non-modal dialog.
      onClick(e);
    }

    useEffect(() => {
      if (ref.current) {
        if (open) {
          if (modal) {
            // Display the dialog as a modal, over the top of any other dialogs
            // that might be present. Everything outside the dialog are inert
            // with interactions outside the dialog being blocked.
            ref.current.showModal();
          } else {
            // Display the dialog modelessly, i.e. still allowing interaction
            // with content outside of the dialog.
            ref.current.show();
          }
        } else {
          ref.current.close();
        }
      }
    }, [modal, open]);

    return (
      <dialog
        {...rest}
        className={cx(
          `${prefix}--dialog`,
          {
            [`${prefix}--dialog--modal`]: modal,
          },
          className
        )}
        ref={ref}
        onCancel={onCancel}
        onClick={handleClick}
        onClose={onClose}>
        {children}
      </dialog>
    );
  }
);

unstable__Dialog.displayName = 'Dialog';

unstable__Dialog.propTypes = {
  /**
   * Provide children to be rendered inside of the Dialog
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Modal specifies whether the Dialog is modal or non-modal. This cannot be
   * changed while open=true
   */
  modal: PropTypes.bool,

  /**
   * Specify a handler for closing Dialog.
   * The handler should care of closing Dialog, e.g. changing `open` prop.
   */
  onRequestClose: PropTypes.func,

  /**
   * open initial state
   */
  open: PropTypes.bool,
};

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children?: React.ReactNode;
}
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, ...rest }, ref) => {
    const prefix = usePrefix();
    return (
      <div className={`${prefix}--dialog__header`} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);
DialogHeader.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,
};

export interface DialogControlsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children?: React.ReactNode;
}
export const DialogControls = React.forwardRef<
  HTMLDivElement,
  DialogControlsProps
>(({ children, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    // @ts-ignore
    <div className={`${prefix}--dialog__header-controls`} ref={ref} {...rest}>
      {children}
    </div>
  );
});
DialogControls.propTypes = {
  /**
   * Provide children to be rendered inside of this component
   */
  children: PropTypes.node,
};

export interface DialogCloseButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify a click handler applied to the IconButton
   */
  onClick?: React.MouseEventHandler;
}
export const DialogCloseButton = React.forwardRef<
  HTMLDivElement,
  DialogCloseButtonProps
>(({ onClick, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    // @ts-ignore
    <IconButton
      kind="ghost"
      className={`${prefix}--dialog__close`}
      label="Close"
      title="Close"
      aria-label="Close"
      align="left"
      onClick={onClick}
      {...rest}>
      <Close
        size={20}
        aria-hidden="true"
        tabIndex="-1"
        className={`${prefix}--icon__close`}
      />
    </IconButton>
  );
});

DialogCloseButton.propTypes = {
  /**
   * Specify a click handler applied to the IconButton
   */
  onClick: PropTypes.func,
};
