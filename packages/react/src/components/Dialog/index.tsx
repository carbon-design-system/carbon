/**
 * Copyright IBM Corp. 2014, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';
import { ReactAttr } from '../../types/common';

export interface DialogProps extends ReactAttr<HTMLDialogElement> {
  /**
   * Provide the contents of the Dialog
   */
  children?: React.ReactNode;

  /**
   * Specifies whether the dialog is modal or non-modal
   */
  modal?: boolean;

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

const unstable__Dialog = React.forwardRef(
  (
    {
      children,
      modal,
      onRequestClose = noopFn,
      open = false,
      ...rest
    }: DialogProps,
    ref
  ) => {
    const backupRef = useRef(null);
    const localRef = (ref ?? backupRef) as MutableRefObject<HTMLDialogElement>;

    const prefix = usePrefix();

    const handleClose = (ev) => {
      if (onRequestClose) {
        onRequestClose(ev);
      }
    };

    const handleCancel = () => {
      localRef.current?.close();
    };

    const handleBackdropClick = (ev) => {
      if (ev.target === localRef.current) {
        localRef.current?.close();
      }
    };

    useEffect(() => {
      if (localRef.current) {
        if (open) {
          if (modal) {
            localRef.current.showModal();
          } else {
            localRef.current.open = true;
          }
        } else {
          localRef.current.close();
        }
      }
    }, [localRef, modal, open]);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <dialog
        {...rest}
        className={cx(`${prefix}--dialog`, {
          [`${prefix}--dialog--modal`]: modal,
        })}
        ref={localRef}
        onCancel={handleCancel}
        onClick={handleBackdropClick}
        onClose={handleClose}>
        <div className={`${prefix}--dialog__header`}>
          <div className={`${prefix}--dialog__header-controls`}>
            <IconButton
              kind="ghost"
              className={`${prefix}--dialog__close`}
              label="Close"
              onClick={handleCancel}
              title="Close"
              aria-label="Close"
              align="left">
              <Close
                size={20}
                aria-hidden="true"
                tabIndex="-1"
                className={`${prefix}--icon__close`}
              />
            </IconButton>
          </div>
        </div>

        <div className={`${prefix}--dialog__content`}>{children}</div>
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
   * Modal specifies whether the Dialog is modal or non-modal
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

export { unstable__Dialog };
export default unstable__Dialog;
