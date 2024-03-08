/**
 * Copyright IBM Corp. 2014, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'wicg-inert';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import cx from 'classnames';
import { useMatchMedia } from '../../internal/useMatchMedia';
import { Close } from '@carbon/icons-react';
import { IconButton } from '../IconButton';

const Dialog = React.forwardRef(
  ({ children, kind, modal, onClose, open = false, width, ...rest }, ref) => {
    const backupRef = useRef(null);
    const localRef = ref || backupRef;
    const [localOpen, setLocalOpen] = useState(false);
    /* opening and closing is used in as allow-discrete is not currently supported wide enough
     * https://caniuse.com/mdn-css_properties_display_is_transitionable
     */
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    /**
     * open state management only exists here to permit animation
     *
     * When support for allow-discrete is ubiquitous https://caniuse.com/mdn-css_properties_display_is_transitionable
     *
     * then this can be removed and CSS simplified
     *
     * https://codepen.io/lee-chase/pen/QWPbRLp/9c8c3f23b42a395dc519839e12f5d647
     *
     */

    /**
     * dialog is closed (open = false)
     * -> open = true
     *  -> localOpen = true
     *    -> dialog.open = true
     *    -> isOpening = true (timeout)
     *      -> isOpen = true
     *      -> isOpening = false
     */

    /**
     * dialog is open (open = true, isOpen = true, localOpen = true)
     * -> open = false
     *  -> localOpen = false
     *    -> isClosing = true
     *    -> transitionEnd or reduced motion
     *      -> isOpen = false
     *      -> localOpen = false
     *      -> isClosing = false;
     */

    /**
     * dialog is open (open = true, isOpen = true, localOpen = true)
     * -> backdrop click or handleCancel
     *  -> localOpen = false
     *    -> isClosing = true
     *    -> transitionEnd or reduced motion
     *      -> isOpen = false
     *      -> localOpen = false
     *      -> isClosing = false;
     */

    const prefix = usePrefix();
    const prefersReducedMotion = useMatchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const handleCancel = (ev) => {
      ev.preventDefault();
      setLocalOpen(false);
    };

    const handleClose = (ev) => {
      if (onClose) {
        onClose(ev);
      }
    };

    const handleBackdropClick = (ev) => {
      if (ev.target === localRef?.current) {
        setLocalOpen(false);
      }
    };

    const handleTransitionEnd = (ev) => {
      if (ev.target === localRef?.current) {
        if (isClosing) {
          setIsOpen(false);
          setIsClosing(false);
          localRef?.current?.close();
        }
      }
    };

    useEffect(() => {
      // this progresses closing when isClosing
      if (isOpen && isClosing) {
        if (prefersReducedMotion) {
          setIsOpen(false);
          setIsClosing(false);
        }
        // note prefersReducedMotion case handled by handleTransitionEnd
      }
    }, [isClosing, isOpen, prefersReducedMotion]);

    useEffect(() => {
      if (isOpening) {
        // dialog should already be displayed set isOpen animates opening
        setIsOpen(true);
        setIsOpening(false);
      }
    }, [isOpening]);

    useEffect(() => {
      // this handles localOpen change
      if (localOpen !== isOpen) {
        if (localOpen) {
          if (modal) {
            localRef.current.showModal();
          } else {
            localRef.current.open = true;
          }

          if (prefersReducedMotion) {
            setIsOpening(true);
          } else {
            /* opening and closing is used in as allow-discrete is not currently supported wide enough
             * https://caniuse.com/mdn-css_properties_display_is_transitionable */

            // delaying setIsOpening to allow animation
            window.requestAnimationFrame(() => setIsOpening(true));
          }
        } else {
          // isClosing triggers actual close sequence (allowing for animation)
          setIsClosing(true);
        }
      }
    }, [isOpen, localOpen, localRef, modal, prefersReducedMotion]);

    useEffect(() => {
      // triggers open or close sequence
      setLocalOpen(open);
    }, [open]);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <dialog
        {...rest}
        className={cx(`${prefix}--dialog`)}
        data-closing={isClosing ? '' : null}
        data-is-open={localOpen && isOpen ? '' : null}
        data-width={width}
        data-modal={modal ? '' : null}
        data-kind={kind ? kind : null}
        ref={localRef}
        onCancel={handleCancel}
        onClick={handleBackdropClick}
        onClose={handleClose}
        onTransitionEnd={handleTransitionEnd}>
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

Dialog.displayName = 'Dialog';

Dialog.propTypes = {
  /**
   * Provide children to be rendered inside of the Dialog
   */
  children: PropTypes.node,

  /**
   * kind default (dialog/modal), side-right, side-left, tearsheet
   *
   */
  kind: PropTypes.oneOf(['', 'side-start', 'side-end', 'tearsheet']),

  /**
   * Modal specifies whether the dialog is modal
   */
  modal: PropTypes.bool,

  /**
   * Provide a handler that is called when the Dialog is requesting to be closed
   */
  onClose: PropTypes.func,

  /**
   * open initial state
   */
  open: PropTypes.bool,

  /**
   * Sets the width of the side panel
   */
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

export { Dialog };
export default Dialog;
