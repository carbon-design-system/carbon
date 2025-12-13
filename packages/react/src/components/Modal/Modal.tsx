/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { type Validator } from 'prop-types';
import React, {
  cloneElement,
  useContext,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import { toggleClass } from '../../tools/toggleClass';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import InlineLoading from '../InlineLoading';
import { Layer } from '../Layer';
import { requiredIfGivenPropIsTruthy } from '../../prop-types/requiredIfGivenPropIsTruthy';
import {
  elementOrParentIsFloatingMenu,
  wrapFocus,
  wrapFocusWithoutSentinels,
} from '../../internal/wrapFocus';
import { useResizeObserver } from '../../internal/useResizeObserver';
import { useId } from '../../internal/useId';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { usePreviousValue } from '../../internal/usePreviousValue';
import { keys, match } from '../../internal/keyboard';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { InlineLoadingStatus } from '../InlineLoading/InlineLoading';
import { useFeatureFlag } from '../FeatureFlags';
import { composeEventHandlers } from '../../tools/events';
import { deprecate } from '../../prop-types/deprecate';
import { Dialog } from '../Dialog';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { warning } from '../../internal/warning';

import {
  ModalPresence,
  ModalPresenceContext,
  useExclusiveModalPresenceContext,
} from './ModalPresence';

export const ModalSizes = ['xs', 'sm', 'md', 'lg'] as const;
const invalidOutsideClickMessage =
  '`<Modal>` prop `preventCloseOnClickOutside` should not be `false` when ' +
  '`passiveModal` is `false`. Transactional, non-passive Modals should ' +
  'not be dissmissable by clicking outside. ' +
  'See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal';

export type ModalSize = (typeof ModalSizes)[number];

export interface ModalSecondaryButton {
  buttonText?: string | ReactNode;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
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
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Specify label for the close button of the modal; defaults to close
   */
  closeButtonLabel?: string;

  /**
   * Specify whether the Modal is for dangerous actions
   */
  danger?: boolean;

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `Modal` component
   */
  decorator?: ReactNode;

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
  launcherButtonRef?: RefObject<HTMLButtonElement | null>;

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
  modalHeading?: ReactNode;

  /**
   * Specify the content of the modal header label.
   */
  modalLabel?: ReactNode;

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
  primaryButtonText?: ReactNode;

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText?: ReactNode;

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
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Modal` component
   */
  slug?: ReactNode;
}
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { open, ...props },
  ref
) {
  const id = useId();

  const enablePresence = useFeatureFlag('enable-presence');
  const hasPresenceContext = Boolean(useContext(ModalPresenceContext));
  const hasPresenceOptIn = enablePresence || hasPresenceContext;

  const exclusivePresenceContext = useExclusiveModalPresenceContext(id);

  // if opt in and not exclusive to a presence context, wrap with presence
  if (hasPresenceOptIn && !exclusivePresenceContext) {
    return (
      <ModalPresence
        open={open ?? false}
        _presenceId={id}
        // do not auto enable styles for opt-in by feature flag
        _autoEnablePresence={hasPresenceContext}>
        <ModalDialog open ref={ref} {...props} />
      </ModalPresence>
    );
  }

  return <ModalDialog ref={ref} open={open} {...props} />;
});

const ModalDialog = React.forwardRef(function ModalDialog(
  {
    'aria-label': ariaLabelProp,
    children,
    className,
    decorator,
    modalHeading = '',
    modalLabel = '',
    modalAriaLabel,
    passiveModal = false,
    secondaryButtonText,
    primaryButtonText,
    open: externalOpen,
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
    preventCloseOnClickOutside,
    isFullWidth,
    launcherButtonRef,
    loadingStatus = 'inactive',
    loadingDescription,
    loadingIconDescription,
    onLoadingSuccess = noopFn,
    slug,
    ...rest
  }: ModalProps,
  ref: React.Ref<HTMLDivElement>
) {
  const prefix = usePrefix();
  const button = useRef<HTMLButtonElement>(null);
  const secondaryButton = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerModal = useRef<HTMLDivElement>(null);
  const startTrap = useRef<HTMLSpanElement>(null);
  const endTrap = useRef<HTMLSpanElement>(null);
  const wrapFocusTimeout = useRef<NodeJS.Timeout>(null);
  const modalInstanceId = `modal-${useId()}`;
  const modalLabelId = `${prefix}--modal-header__label--${modalInstanceId}`;
  const modalHeadingId = `${prefix}--modal-header__heading--${modalInstanceId}`;
  const modalBodyId = `${prefix}--modal-body--${modalInstanceId}`;
  const modalCloseButtonClass = `${prefix}--modal-close`;
  const primaryButtonClass = classNames({
    [`${prefix}--btn--loading`]: loadingStatus !== 'inactive',
  });
  const loadingActive = loadingStatus !== 'inactive';

  const presenceContext = useContext(ModalPresenceContext);
  const mergedRefs = useMergedRefs([ref, presenceContext?.presenceRef]);
  const enablePresence =
    useFeatureFlag('enable-presence') || presenceContext?.autoEnablePresence;

  // always mark as open when mounted with presence
  const open = externalOpen || enablePresence;
  const prevOpen = usePreviousValue(open);

  const deprecatedFlag = useFeatureFlag(
    'enable-experimental-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinelsFlag = useFeatureFlag(
    'enable-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinels =
    focusTrapWithoutSentinelsFlag || deprecatedFlag;
  const enableDialogElement = useFeatureFlag('enable-dialog-element');
  warning(
    !(focusTrapWithoutSentinels && enableDialogElement),
    '`<Modal>` detected both `focusTrapWithoutSentinels` and ' +
      '`enableDialogElement` feature flags are enabled. The native dialog ' +
      'element handles focus, so `enableDialogElement` must be off for ' +
      '`focusTrapWithoutSentinels` to have any effect.'
  );
  warning(
    !(!passiveModal && preventCloseOnClickOutside === false),
    invalidOutsideClickMessage
  );

  function isCloseButton(element: Element) {
    return (
      (!onSecondarySubmit && element === secondaryButton.current) ||
      element.classList.contains(modalCloseButtonClass)
    );
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement>) {
    const { target } = evt;

    evt.stopPropagation();

    if (open && target instanceof HTMLElement) {
      if (
        match(evt, keys.Enter) &&
        shouldSubmitOnEnter &&
        !isCloseButton(target) &&
        document.activeElement !== button.current
      ) {
        onRequestSubmit(evt);
      }

      if (
        focusTrapWithoutSentinels &&
        !enableDialogElement &&
        match(evt, keys.Tab) &&
        innerModal.current
      ) {
        wrapFocusWithoutSentinels({
          containerNode: innerModal.current,
          currentActiveNode: target,
          event: evt,
        });
      }
    }
  }

  function handleOnClick(evt: React.MouseEvent<HTMLDivElement>) {
    const { target } = evt;
    evt.stopPropagation();

    const shouldCloseOnOutsideClick =
      // Passive modals can close on clicks outside the modal when
      // preventCloseOnClickOutside is undefined or explicitly set to false.
      (passiveModal && !preventCloseOnClickOutside) ||
      // Non-passive modals have to explicitly opt-in for close on outside
      // behavior by explicitly setting preventCloseOnClickOutside to false,
      // rather than just leaving it undefined.
      (!passiveModal && preventCloseOnClickOutside === false);

    if (
      shouldCloseOnOutsideClick &&
      target instanceof Node &&
      !elementOrParentIsFloatingMenu(target, selectorsFloatingMenus, prefix) &&
      innerModal.current &&
      !innerModal.current.contains(target)
    ) {
      onRequestClose(evt);
    }
  }

  function handleBlur({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }: React.FocusEvent<HTMLDivElement>) {
    if (
      !enableDialogElement &&
      open &&
      oldActiveNode instanceof HTMLElement &&
      currentActiveNode instanceof HTMLElement
    ) {
      const { current: bodyNode } = innerModal;
      const { current: startTrapNode } = startTrap;
      const { current: endTrapNode } = endTrap;
      // use setTimeout to ensure focus is set after all browser default focus behavior. Fixes issue of
      // focus not wrapping in Firefox
      wrapFocusTimeout.current = setTimeout(() => {
        wrapFocus({
          bodyNode,
          startTrapNode,
          endTrapNode,
          currentActiveNode,
          oldActiveNode,
          selectorsFloatingMenus,
          prefix,
        });
        if (wrapFocusTimeout.current) {
          clearTimeout(wrapFocusTimeout.current);
        }
      });
    }

    // Adjust scroll if needed so that element with focus is not obscured by gradient
    const modalContent = document.querySelector(`.${prefix}--modal-content`);
    if (
      !modalContent ||
      !modalContent.classList.contains(`${prefix}--modal-scroll-content`) ||
      !currentActiveNode ||
      !modalContent.contains(currentActiveNode)
    ) {
      return;
    }

    currentActiveNode.scrollIntoView({ block: 'center' });
  }

  const onSecondaryButtonClick = onSecondarySubmit
    ? onSecondarySubmit
    : onRequestClose;

  const { height } = useResizeObserver({ ref: contentRef });

  const modalClasses = classNames(
    `${prefix}--modal`,
    {
      [`${prefix}--modal-tall`]: !passiveModal,
      'is-visible': enablePresence || open,
      [`${prefix}--modal--enable-presence`]:
        presenceContext?.autoEnablePresence,
      [`${prefix}--modal--danger`]: danger,
      [`${prefix}--modal--slug`]: slug,
      [`${prefix}--modal--decorator`]: decorator,
    },
    className
  );

  const containerClasses = classNames(`${prefix}--modal-container`, {
    [`${prefix}--modal-container--${size}`]: size,
    [`${prefix}--modal-container--full-width`]: isFullWidth,
  });

  /**
   * isScrollable is implicitly dependent on height, when height gets updated
   * via `useResizeObserver`, clientHeight and scrollHeight get updated too
   */
  const isScrollable =
    !!contentRef.current &&
    contentRef?.current?.scrollHeight > contentRef?.current?.clientHeight;

  const contentClasses = classNames(`${prefix}--modal-content`, {
    [`${prefix}--modal-scroll-content`]: hasScrollingContent || isScrollable,
    [`${prefix}--modal-scroll-content--no-fade`]: height <= 300,
  });

  const footerClasses = classNames(`${prefix}--modal-footer`, {
    [`${prefix}--modal-footer--three-button`]:
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2,
  });

  const asStringOrUndefined = (node: ReactNode): string | undefined => {
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

  const alertDialogProps: HTMLAttributes<HTMLDivElement> = {};
  if (alert && passiveModal) {
    alertDialogProps.role = 'alert';
  }
  if (alert && !passiveModal) {
    alertDialogProps.role = 'alertdialog';
    alertDialogProps['aria-describedby'] = modalBodyId;
  }

  useEffect(() => {
    if (!open) return;

    const handleEscapeKey = (event) => {
      if (match(event, keys.Escape)) {
        event.preventDefault();
        event.stopPropagation();
        onRequestClose(event);
      }
    };
    document.addEventListener('keydown', handleEscapeKey, true);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey, true);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open]);

  useEffect(() => {
    return () => {
      if (!enableDialogElement) {
        toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
      }
    };
  }, [prefix, enableDialogElement]);

  useEffect(() => {
    if (!enableDialogElement) {
      toggleClass(
        document.body,
        `${prefix}--body--with-modal-open`,
        open ?? false
      );
    }
  }, [open, prefix, enableDialogElement]);

  useEffect(() => {
    if (
      !enableDialogElement &&
      !enablePresence &&
      prevOpen &&
      !open &&
      launcherButtonRef
    ) {
      setTimeout(() => {
        if ('current' in launcherButtonRef) {
          launcherButtonRef.current?.focus();
        }
      });
    }
  }, [open, prevOpen, launcherButtonRef, enableDialogElement, enablePresence]);
  // Focus launcherButtonRef on unmount
  useEffect(() => {
    const launcherButton = launcherButtonRef?.current;
    return () => {
      if (enablePresence && launcherButton) {
        setTimeout(() => {
          launcherButton.focus();
        });
      }
    };
  }, [enablePresence, launcherButtonRef]);

  useEffect(() => {
    if (!enableDialogElement) {
      const initialFocus = (focusContainerElement: HTMLElement | null) => {
        const containerElement = focusContainerElement || innerModal.current;
        const primaryFocusElement =
          containerElement &&
          (containerElement.querySelector<HTMLElement | SVGElement>(
            selectorPrimaryFocus
          ) ||
            (danger &&
              containerElement.querySelector<HTMLElement | SVGElement>(
                `.${prefix}--btn--secondary`
              )));

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
    }
  }, [open, selectorPrimaryFocus, danger, prefix, enableDialogElement]);

  // AILabel always size `sm`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'sm' })
    : candidate;

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

  // alertdialog is the only permitted aria role for a native dialog element
  // https://www.w3.org/TR/html-aria/#docconformance:~:text=Role%3A-,alertdialog,-.%20(dialog%20is
  const isAlertDialog = alert && !passiveModal;

  const modalBody = enableDialogElement ? (
    <Dialog
      open={open}
      focusAfterCloseRef={launcherButtonRef}
      modal
      ref={innerModal}
      role={isAlertDialog ? 'alertdialog' : ''}
      aria-describedby={isAlertDialog ? modalBodyId : ''}
      className={containerClasses}
      aria-label={ariaLabel}
      data-exiting={presenceContext?.isExiting || undefined}>
      <div className={`${prefix}--modal-header`}>
        {modalLabel && (
          <Text
            as="h2"
            id={modalLabelId}
            className={`${prefix}--modal-header__label`}>
            {modalLabel}
          </Text>
        )}
        <Text
          as="h2"
          id={modalHeadingId}
          className={`${prefix}--modal-header__heading`}>
          {modalHeading}
        </Text>
        {decorator ? (
          <div className={`${prefix}--modal--inner__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
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
      </div>
      <Layer
        ref={contentRef}
        id={modalBodyId}
        className={contentClasses}
        {...hasScrollingContentProps}>
        {children}
      </Layer>
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
    </Dialog>
  ) : (
    <>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      {!enableDialogElement && !focusTrapWithoutSentinels && (
        <span
          ref={startTrap}
          tabIndex={0}
          role="link"
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </span>
      )}
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
            as="h2"
            id={modalHeadingId}
            className={`${prefix}--modal-header__heading`}>
            {modalHeading}
          </Text>
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div className={`${prefix}--modal--inner__decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
          {!passiveModal && modalButton}
        </div>
        <Layer
          ref={contentRef}
          id={modalBodyId}
          className={contentClasses}
          {...hasScrollingContentProps}>
          {children}
        </Layer>
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
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      {!enableDialogElement && !focusTrapWithoutSentinels && (
        <span
          ref={endTrap}
          tabIndex={0}
          role="link"
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </span>
      )}
    </>
  );

  return (
    <Layer
      {...rest}
      level={0}
      onKeyDown={handleKeyDown}
      onClick={composeEventHandlers([rest?.onClick, handleOnClick])}
      onBlur={handleBlur}
      className={modalClasses}
      role="presentation"
      ref={mergedRefs}
      data-exiting={presenceContext?.isExiting || undefined}>
      {modalBody}
    </Layer>
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
   * Specify label for the close button of the modal; defaults to close
   */
  closeButtonLabel: PropTypes.string,

  /**
   * Specify whether the Modal is for dangerous actions
   */
  danger: PropTypes.bool,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `Modal` component
   */
  decorator: PropTypes.node,

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
      current: PropTypes.oneOfType([
        // `PropTypes.instanceOf(HTMLButtonElement)` alone won't work because
        // `HTMLButtonElement` is not defined in the test environment even
        // though `testEnvironment` is set to `jsdom`.
        typeof HTMLButtonElement !== 'undefined'
          ? PropTypes.instanceOf(HTMLButtonElement)
          : PropTypes.any,
        PropTypes.oneOf([null]),
      ]).isRequired,
    }),
  ]) as Validator<RefObject<HTMLButtonElement | null>>,

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
  preventCloseOnClickOutside: (props: ModalProps, propName: string) => {
    if (!props.passiveModal && props[propName] === false) {
      return new Error(invalidOutsideClickMessage);
    }

    return null;
  },

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

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),
};

export default Modal;
