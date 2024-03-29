/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import toggleClass from '../../tools/toggleClass';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import InlineLoading from '../InlineLoading';
import requiredIfGivenPropIsTruthy from '../../prop-types/requiredIfGivenPropIsTruthy';
import wrapFocus, {
  wrapFocusWithoutSentinels,
  elementOrParentIsFloatingMenu,
} from '../../internal/wrapFocus';
import debounce from 'lodash.debounce';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { ReactAttr } from '../../types/common';
import { InlineLoadingStatus } from '../InlineLoading/InlineLoading';
import { useFeatureFlag } from '../FeatureFlags';

const getInstanceId = setupGetInstanceId();

export const ModalSizes = ['xs', 'sm', 'md', 'lg'] as const;

export type ModalSize = (typeof ModalSizes)[number];

export interface ModalSecondaryButton {
  buttonText?: string | React.ReactNode;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps extends ReactAttr<HTMLDivElement> {
  /**
   * Specify whether the Modal is displaying an alert, error or warning
   * Should go hand in hand with the danger prop.
   */
  alert?: boolean;

  /**
   * Required props for the accessibility label of the header
   */
  'aria-label'?: string;

  /**
   * Provide the contents of your Modal
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Specify an label for the close button of the modal; defaults to close
   */
  closeButtonLabel?: string;

  /**
   * Specify whether the Modal is for dangerous actions
   */
  danger?: boolean;

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent?: boolean;

  /**
   * Specify the DOM element ID of the top-level node.
   */
  id?: string;

  /**
   * Specify whether or not the Modal content should have any inner padding.
   */
  isFullWidth?: boolean;

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef?: any; // TODO FIXME

  /**
   * Specify the description for the loading text
   */
  loadingDescription?: string;

  /**
   * Specify the description for the loading text
   */
  loadingIconDescription?: string;

  /**
   * Specify loading status
   */
  loadingStatus?: InlineLoadingStatus;

  /**
   * Specify a label to be read by screen readers on the modal root node
   */
  modalAriaLabel?: string;

  /**
   * Specify the content of the modal header title.
   */
  modalHeading?: React.ReactNode;

  /**
   * Specify the content of the modal header label.
   */
  modalLabel?: React.ReactNode;

  /**
   * Specify a handler for keypresses.
   * @deprecated this property is unused
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;

  /**
   * Specify an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess?: () => void;

  /**
   * Specify a handler for closing modal.
   * The handler should care of closing modal, e.g. changing `open` prop.
   */
  onRequestClose?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify a handler for "submitting" modal.
   * The handler should care of closing modal, e.g. changing `open` prop, if necessary.
   */
  onRequestSubmit?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify a handler for the secondary button.
   * Useful if separate handler from `onRequestClose` is desirable
   */
  onSecondarySubmit?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify whether the Modal is currently open
   */
  open?: boolean;

  /**
   * Specify whether the modal should be button-less
   */
  passiveModal?: boolean;

  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside?: boolean;

  /**
   * Specify whether the Button should be disabled, or not
   */
  primaryButtonDisabled?: boolean;

  /**
   * Specify the text for the primary button
   */
  primaryButtonText?: React.ReactNode;

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText?: React.ReactNode;

  /**
   * Specify an array of config objects for secondary buttons
   */
  secondaryButtons?: ModalSecondaryButton[];

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the Modal opens
   */
  selectorPrimaryFocus?: string;

  /**
   * Specify CSS selectors that match DOM elements working as floating menus.
   * Focusing on those elements won't trigger "focus-wrap" behavior
   */
  selectorsFloatingMenus?: string[];

  /**
   * Specify if Enter key should be used as "submit" action
   */
  shouldSubmitOnEnter?: boolean;

  /**
   * Specify the size variant.
   */
  size?: ModalSize;

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Modal` component
   */
  slug?: ReactNodeLike;
}

const Modal = React.forwardRef(function Modal(
  {
    'aria-label': ariaLabelProp,
    children,
    className,
    modalHeading = '',
    modalLabel = '',
    modalAriaLabel,
    passiveModal = false,
    secondaryButtonText,
    primaryButtonText,
    open,
    onRequestClose = noopFn,
    onRequestSubmit = noopFn,
    onSecondarySubmit,
    primaryButtonDisabled = false,
    danger,
    alert,
    secondaryButtons,
    selectorPrimaryFocus = '[data-modal-primary-focus]',
    selectorsFloatingMenus,
    shouldSubmitOnEnter,
    size,
    hasScrollingContent = false,
    closeButtonLabel = 'Close',
    preventCloseOnClickOutside = false,
    isFullWidth,
    launcherButtonRef,
    loadingStatus = 'inactive',
    loadingDescription,
    loadingIconDescription,
    onLoadingSuccess = noopFn,
    slug,
    ...rest
  }: ModalProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const prefix = usePrefix();
  const button = useRef<HTMLButtonElement>(null);
  const secondaryButton = useRef();
  const contentRef = useRef<HTMLDivElement>(null);
  const innerModal = useRef<HTMLDivElement>(null);
  const startTrap = useRef<HTMLSpanElement>(null);
  const endTrap = useRef<HTMLSpanElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const modalInstanceId = `modal-${getInstanceId()}`;
  const modalLabelId = `${prefix}--modal-header__label--${modalInstanceId}`;
  const modalHeadingId = `${prefix}--modal-header__heading--${modalInstanceId}`;
  const modalBodyId = `${prefix}--modal-body--${modalInstanceId}`;
  const modalCloseButtonClass = `${prefix}--modal-close`;
  const primaryButtonClass = classNames({
    [`${prefix}--btn--loading`]: loadingStatus !== 'inactive',
  });
  const loadingActive = loadingStatus !== 'inactive';
  const focusTrapWithoutSentinels = useFeatureFlag(
    'enable-experimental-focus-wrap-without-sentinels'
  );

  function isCloseButton(element: Element) {
    return (
      (!onSecondarySubmit && element === secondaryButton.current) ||
      element.classList.contains(modalCloseButtonClass)
    );
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement>) {
    evt.stopPropagation();
    if (open) {
      if (match(evt, keys.Escape)) {
        onRequestClose(evt);
      }

      if (
        match(evt, keys.Enter) &&
        shouldSubmitOnEnter &&
        !isCloseButton(evt.target as Element)
      ) {
        onRequestSubmit(evt);
      }

      if (
        focusTrapWithoutSentinels &&
        match(evt, keys.Tab) &&
        innerModal.current
      ) {
        wrapFocusWithoutSentinels({
          containerNode: innerModal.current,
          currentActiveNode: evt.target,
          event: evt as any,
        });
      }
    }
  }

  function handleMousedown(evt: React.MouseEvent<HTMLDivElement>) {
    const target = evt.target as Node;
    evt.stopPropagation();
    if (
      innerModal.current &&
      !innerModal.current.contains(target) &&
      !elementOrParentIsFloatingMenu(target, selectorsFloatingMenus) &&
      !preventCloseOnClickOutside
    ) {
      onRequestClose(evt);
    }
  }

  function handleBlur({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }: React.FocusEvent<HTMLDivElement>) {
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

  const modalClasses = classNames(
    `${prefix}--modal`,
    {
      [`${prefix}--modal-tall`]: !passiveModal,
      'is-visible': open,
      [`${prefix}--modal--danger`]: danger,
      [`${prefix}--modal--slug`]: slug,
    },
    className
  );

  const containerClasses = classNames(`${prefix}--modal-container`, {
    [`${prefix}--modal-container--${size}`]: size,
    [`${prefix}--modal-container--full-width`]: isFullWidth,
  });

  const contentClasses = classNames(`${prefix}--modal-content`, {
    [`${prefix}--modal-scroll-content`]: hasScrollingContent || isScrollable,
  });

  const footerClasses = classNames(`${prefix}--modal-footer`, {
    [`${prefix}--modal-footer--three-button`]:
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2,
  });

  const asStringOrUndefined = (node: React.ReactNode): string | undefined => {
    return typeof node === 'string' ? node : undefined;
  };
  const modalLabelStr = asStringOrUndefined(modalLabel);
  const modalHeadingStr = asStringOrUndefined(modalHeading);
  const ariaLabel =
    modalLabelStr || ariaLabelProp || modalAriaLabel || modalHeadingStr;
  const getAriaLabelledBy = modalLabel ? modalLabelId : modalHeadingId;

  const hasScrollingContentProps =
    hasScrollingContent || isScrollable
      ? {
          tabIndex: 0,
          role: 'region',
          'aria-label': ariaLabel,
          'aria-labelledby': getAriaLabelledBy,
        }
      : {};

  const alertDialogProps: ReactAttr<HTMLDivElement> = {};
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
    toggleClass(
      document.body,
      `${prefix}--body--with-modal-open`,
      open ?? false
    );
  }, [open, prefix]);

  useEffect(() => {
    if (!open && launcherButtonRef) {
      setTimeout(() => {
        launcherButtonRef?.current?.focus();
      });
    }
  }, [open, launcherButtonRef]);

  useEffect(() => {
    const initialFocus = (focusContainerElement: HTMLElement | null) => {
      const containerElement = focusContainerElement || innerModal.current;
      const primaryFocusElement = containerElement
        ? containerElement.querySelector<HTMLElement | SVGElement>(
            danger ? `.${prefix}--btn--secondary` : selectorPrimaryFocus
          )
        : null;

      if (primaryFocusElement) {
        return primaryFocusElement;
      }

      return button && button.current;
    };

    const focusButton = (focusContainerElement: HTMLElement | null) => {
      const target = initialFocus(focusContainerElement);
      if (target !== null) {
        target.focus();
      }
    };

    if (open) {
      focusButton(innerModal.current);
    }
  }, [open, selectorPrimaryFocus, danger, prefix]);

  useIsomorphicEffect(() => {
    if (contentRef.current) {
      setIsScrollable(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }

    function handler() {
      if (contentRef.current) {
        setIsScrollable(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    }

    const debouncedHandler = debounce(handler, 200);
    window.addEventListener('resize', debouncedHandler);
    return () => {
      debouncedHandler.cancel();
      window.removeEventListener('resize', debouncedHandler);
    };
  }, []);

  // Slug is always size `sm`
  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'sm',
    });
  }

  const modalButton = (
    <div className={`${prefix}--modal-close-button`}>
      <IconButton
        className={modalCloseButtonClass}
        label={closeButtonLabel}
        onClick={onRequestClose}
        aria-label={closeButtonLabel}
        align="left"
        ref={button}>
        <Close
          size={20}
          aria-hidden="true"
          tabIndex="-1"
          className={`${modalCloseButtonClass}__icon`}
        />
      </IconButton>
    </div>
  );

  const modalBody = (
    <div
      ref={innerModal}
      role="dialog"
      {...alertDialogProps}
      className={containerClasses}
      aria-label={ariaLabel}
      aria-modal="true"
      tabIndex={-1}>
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
        {normalizedSlug}
        {!passiveModal && modalButton}
      </div>
      <div
        ref={contentRef}
        id={modalBodyId}
        className={contentClasses}
        {...hasScrollingContentProps}>
        {children}
      </div>
      {!passiveModal && (
        <ButtonSet className={footerClasses} aria-busy={loadingActive}>
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
                  disabled={loadingActive}
                  kind="secondary"
                  onClick={onSecondaryButtonClick}
                  ref={secondaryButton}>
                  {secondaryButtonText}
                </Button>
              )}
          <Button
            className={primaryButtonClass}
            kind={danger ? 'danger' : 'primary'}
            disabled={loadingActive || primaryButtonDisabled}
            onClick={onRequestSubmit}
            ref={button}>
            {loadingStatus === 'inactive' ? (
              primaryButtonText
            ) : (
              <InlineLoading
                status={loadingStatus}
                description={loadingDescription}
                iconDescription={loadingIconDescription}
                className={`${prefix}--inline-loading--btn`}
                onSuccess={onLoadingSuccess}
              />
            )}
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
      onBlur={!focusTrapWithoutSentinels ? handleBlur : () => {}}
      className={modalClasses}
      role="presentation"
      ref={ref}>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      {!focusTrapWithoutSentinels && (
        <span
          ref={startTrap}
          tabIndex={0}
          role="link"
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </span>
      )}
      {modalBody}
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      {!focusTrapWithoutSentinels && (
        <span
          ref={endTrap}
          tabIndex={0}
          role="link"
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </span>
      )}
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
   * Specify the description for the loading text
   */
  loadingDescription: PropTypes.string,

  /**
   * Specify the description for the loading text
   */
  loadingIconDescription: PropTypes.string,

  /**
   * loading status
   */
  loadingStatus: PropTypes.oneOf(['inactive', 'active', 'finished', 'error']),

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
   * Provide an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess: PropTypes.func,

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
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string.isRequired),

  /**
   * Specify if Enter key should be used as "submit" action
   */
  shouldSubmitOnEnter: PropTypes.bool,

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(ModalSizes),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Modal` component
   */
  slug: PropTypes.node,
};

export default Modal;
