/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import toggleClass from '../../tools/toggleClass';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import requiredIfGivenPropIsTruthy from '../../prop-types/requiredIfGivenPropIsTruthy';
import wrapFocus, {
  elementOrParentIsFloatingMenu,
} from '../../internal/wrapFocus';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { Text } from '../Text';

const getInstanceId = setupGetInstanceId();

const Modal = React.forwardRef(function Modal(
  {
    'aria-label': ariaLabelProp,
    children,
    className,
    modalHeading,
    modalLabel,
    modalAriaLabel,
    passiveModal,
    secondaryButtonText,
    primaryButtonText,
    open,
    onRequestClose,
    onRequestSubmit,
    onSecondarySubmit,
    primaryButtonDisabled,
    danger,
    alert,
    secondaryButtons,
    selectorPrimaryFocus, // eslint-disable-line
    selectorsFloatingMenus, // eslint-disable-line
    shouldSubmitOnEnter, // eslint-disable-line
    size,
    hasScrollingContent,
    closeButtonLabel,
    preventCloseOnClickOutside, // eslint-disable-line
    isFullWidth,
    launcherButtonRef,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const button = useRef();
  const secondaryButton = useRef();
  const innerModal = useRef();
  const startTrap = useRef();
  const endTrap = useRef();
  const modalInstanceId = `modal-${getInstanceId()}`;
  const modalLabelId = `${prefix}--modal-header__label--${modalInstanceId}`;
  const modalHeadingId = `${prefix}--modal-header__heading--${modalInstanceId}`;
  const modalBodyId = `${prefix}--modal-body--${modalInstanceId}`;
  const modalCloseButtonClass = `${prefix}--modal-close`;

  function isCloseButton(element) {
    return (
      (!onSecondarySubmit && element === secondaryButton.current) ||
      element.classList.contains(modalCloseButtonClass)
    );
  }

  function handleKeyDown(evt) {
    if (open) {
      if (match(evt, keys.Escape)) {
        onRequestClose(evt);
      }
      if (
        match(evt, keys.Enter) &&
        shouldSubmitOnEnter &&
        !isCloseButton(evt.target)
      ) {
        onRequestSubmit(evt);
      }
    }
  }

  function handleMousedown(evt) {
    if (
      innerModal.current &&
      !innerModal.current.contains(evt.target) &&
      !elementOrParentIsFloatingMenu(evt.target, selectorsFloatingMenus) &&
      !preventCloseOnClickOutside
    ) {
      onRequestClose(evt);
    }
  }

  function handleBlur({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }) {
    if (open && currentActiveNode && oldActiveNode) {
      const { current: bodyNode } = innerModal;
      const { current: startTrapNode } = startTrap;
      const { current: endTrapNode } = endTrap;
      wrapFocus({
        bodyNode,
        startTrapNode,
        endTrapNode,
        currentActiveNode,
        oldActiveNode,
        selectorsFloatingMenus,
      });
    }
  }

  const onSecondaryButtonClick = onSecondarySubmit
    ? onSecondarySubmit
    : onRequestClose;

  const modalClasses = classNames(`${prefix}--modal`, {
    [`${prefix}--modal-tall`]: !passiveModal,
    'is-visible': open,
    [`${prefix}--modal--danger`]: danger,
    [className]: className,
  });

  const containerClasses = classNames(`${prefix}--modal-container`, {
    [`${prefix}--modal-container--${size}`]: size,
    [`${prefix}--modal-container--full-width`]: isFullWidth,
  });

  const contentClasses = classNames(`${prefix}--modal-content`, {
    [`${prefix}--modal-scroll-content`]: hasScrollingContent,
  });

  const footerClasses = classNames(`${prefix}--modal-footer`, {
    [`${prefix}--modal-footer--three-button`]:
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2,
  });

  const ariaLabel =
    modalLabel || ariaLabelProp || modalAriaLabel || modalHeading;
  const getAriaLabelledBy = modalLabel ? modalLabelId : modalHeadingId;

  const hasScrollingContentProps = hasScrollingContent
    ? {
        tabIndex: 0,
        role: 'region',
        'aria-label': ariaLabel,
        'aria-labelledby': getAriaLabelledBy,
      }
    : {};

  const alertDialogProps = {};
  if (alert && passiveModal) {
    alertDialogProps.role = 'alert';
  }
  if (alert && !passiveModal) {
    alertDialogProps.role = 'alertdialog';
    alertDialogProps['aria-describedby'] = modalBodyId;
  }

  useEffect(() => {
    return () => {
      toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
    };
  }, [prefix]);

  useEffect(() => {
    toggleClass(document.body, `${prefix}--body--with-modal-open`, open);
  }, [open, prefix]);

  useEffect(() => {
    if (!open && launcherButtonRef) {
      setTimeout(() => {
        launcherButtonRef?.current?.focus();
      });
    }
  }, [open, launcherButtonRef]);

  useEffect(() => {
    const initialFocus = (focusContainerElement) => {
      const containerElement = focusContainerElement || innerModal.current;
      const primaryFocusElement = containerElement
        ? containerElement.querySelector(
            danger ? `.${prefix}--btn--secondary` : selectorPrimaryFocus
          )
        : null;

      if (primaryFocusElement) {
        return primaryFocusElement;
      }

      return button && button.current;
    };

    const focusButton = (focusContainerElement) => {
      const target = initialFocus(focusContainerElement);
      if (target) {
        target.focus();
      }
    };

    if (open) {
      focusButton(innerModal.current);
    }
  }, [open, selectorPrimaryFocus, danger, prefix]);

  const modalButton = (
    <button
      className={modalCloseButtonClass}
      type="button"
      onClick={onRequestClose}
      title={ariaLabel}
      aria-label={closeButtonLabel ? closeButtonLabel : 'close'}
      ref={button}>
      <Close
        size={20}
        aria-hidden="true"
        tabIndex="-1"
        className={`${modalCloseButtonClass}__icon`}
      />
    </button>
  );

  const modalBody = (
    <div
      ref={innerModal}
      role="dialog"
      {...alertDialogProps}
      className={containerClasses}
      aria-label={ariaLabel}
      aria-modal="true"
      tabIndex="-1">
      <div className={`${prefix}--modal-header`}>
        {passiveModal && modalButton}
        {modalLabel && (
          <Text
            as="h2"
            id={modalLabelId}
            className={`${prefix}--modal-header__label`}>
            {modalLabel}
          </Text>
        )}
        <Text
          as="h3"
          id={modalHeadingId}
          className={`${prefix}--modal-header__heading`}>
          {modalHeading}
        </Text>
        {!passiveModal && modalButton}
      </div>
      <div
        id={modalBodyId}
        className={contentClasses}
        {...hasScrollingContentProps}>
        {children}
      </div>
      {hasScrollingContent && (
        <div className={`${prefix}--modal-content--overflow-indicator`} />
      )}
      {!passiveModal && (
        <ButtonSet className={footerClasses}>
          {Array.isArray(secondaryButtons) && secondaryButtons.length <= 2
            ? secondaryButtons.map(
                ({ buttonText, onClick: onButtonClick }, i) => (
                  <Button
                    key={`${buttonText}-${i}`}
                    kind="secondary"
                    onClick={onButtonClick}>
                    {buttonText}
                  </Button>
                )
              )
            : secondaryButtonText && (
                <Button
                  kind="secondary"
                  onClick={onSecondaryButtonClick}
                  ref={secondaryButton}>
                  {secondaryButtonText}
                </Button>
              )}
          <Button
            kind={danger ? 'danger' : 'primary'}
            disabled={primaryButtonDisabled}
            onClick={onRequestSubmit}
            ref={button}>
            {primaryButtonText}
          </Button>
        </ButtonSet>
      )}
    </div>
  );

  return (
    <div
      {...rest}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMousedown}
      onBlur={handleBlur}
      className={modalClasses}
      role="presentation"
      ref={ref}>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      <span
        ref={startTrap}
        tabIndex="0"
        role="link"
        className={`${prefix}--visually-hidden`}>
        Focus sentinel
      </span>
      {modalBody}
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      <span
        ref={endTrap}
        tabIndex="0"
        role="link"
        className={`${prefix}--visually-hidden`}>
        Focus sentinel
      </span>
    </div>
  );
});

Modal.propTypes = {
  /**
   * Specify whether the Modal is displaying an alert, error or warning
   * Should go hand in hand with the danger prop.
   */
  alert: PropTypes.bool,

  /**
   * Required props for the accessibility label of the header
   */
  ['aria-label']: requiredIfGivenPropIsTruthy(
    'hasScrollingContent',
    PropTypes.string
  ),

  /**
   * Provide the contents of your Modal
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Specify an label for the close button of the modal; defaults to close
   */
  closeButtonLabel: PropTypes.string,

  /**
   * Specify whether the Modal is for dangerous actions
   */
  danger: PropTypes.bool,

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,

  /**
   * Specify the DOM element ID of the top-level node.
   */
  id: PropTypes.string,

  /**
   * Specify whether or not the Modal content should have any inner padding.
   */
  isFullWidth: PropTypes.bool,

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

  /**
   * Specify a label to be read by screen readers on the modal root node
   */
  modalAriaLabel: PropTypes.string,

  /**
   * Specify the content of the modal header title.
   */
  modalHeading: PropTypes.node,

  /**
   * Specify the content of the modal header label.
   */
  modalLabel: PropTypes.node,

  /**
   * Specify a handler for keypresses.
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify a handler for closing modal.
   * The handler should care of closing modal, e.g. changing `open` prop.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify a handler for "submitting" modal.
   * The handler should care of closing modal, e.g. changing `open` prop, if necessary.
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specify a handler for the secondary button.
   * Useful if separate handler from `onRequestClose` is desirable
   */
  onSecondarySubmit: PropTypes.func,

  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool,

  /**
   * Specify whether the modal should be button-less
   */
  passiveModal: PropTypes.bool,

  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside: PropTypes.bool,

  /**
   * Specify whether the Button should be disabled, or not
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.node,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.node,

  /**
   * Specify an array of config objects for secondary buttons
   * (`Array<{
   *   buttonText: string,
   *   onClick: function,
   * }>`).
   */
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the Modal opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify CSS selectors that match DOM elements working as floating menus.
   * Focusing on those elements won't trigger "focus-wrap" behavior
   */
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify if Enter key should be used as "submit" action
   */
  shouldSubmitOnEnter: PropTypes.bool,

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
};

Modal.defaultProps = {
  onRequestClose: () => {},
  onRequestSubmit: () => {},
  primaryButtonDisabled: false,
  onKeyDown: () => {},
  passiveModal: false,
  modalHeading: '',
  modalLabel: '',
  preventCloseOnClickOutside: false,
  selectorPrimaryFocus: '[data-modal-primary-focus]',
  hasScrollingContent: false,
};

export default Modal;
