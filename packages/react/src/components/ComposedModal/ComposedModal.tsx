/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Children,
  cloneElement,
  useContext,
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import { useResizeObserver } from '../../internal/useResizeObserver';
import { isElement } from 'react-is';
import PropTypes from 'prop-types';
import { Layer } from '../Layer';
import { ModalHeader, type ModalHeaderProps } from './ModalHeader';
import { ModalFooter, type ModalFooterProps } from './ModalFooter';
import { mergeRefs } from '../../tools/mergeRefs';
import cx from 'classnames';
import { toggleClass } from '../../tools/toggleClass';
import { requiredIfGivenPropIsTruthy } from '../../prop-types/requiredIfGivenPropIsTruthy';
import {
  elementOrParentIsFloatingMenu,
  wrapFocus,
  wrapFocusWithoutSentinels,
} from '../../internal/wrapFocus';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useFeatureFlag } from '../FeatureFlags';
import { composeEventHandlers } from '../../tools/events';
import { deprecate } from '../../prop-types/deprecate';
import { Dialog } from '../Dialog';
import { warning } from '../../internal/warning';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { useMergeRefs } from '@floating-ui/react';
import {
  ComposedModalPresence,
  ComposedModalPresenceContext,
  useExclusiveComposedModalPresenceContext,
} from './ComposedModalPresence';
import { useId } from '../../internal/useId';
import { useComposedModalState } from './useComposedModalState';

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Specify the content to be placed in the ModalBody. */
  children?: ReactNode;

  /**
   * Provide whether the modal content has a form element.
   * If `true` is used here, non-form child content should have `cds--modal-content__regular-content` class.
   */
  hasForm?: boolean;

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent?: boolean;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  function ModalBody(
    {
      className: customClassName,
      children,
      hasForm,
      hasScrollingContent,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const contentRef = useRef<HTMLDivElement>(null);

    const { height } = useResizeObserver({ ref: contentRef });

    /**
     * isScrollable is implicitly dependent on height, when height gets updated
     * via `useResizeObserver`, clientHeight and scrollHeight get updated too
     */
    const isScrollable =
      !!contentRef.current &&
      contentRef?.current?.scrollHeight > contentRef?.current?.clientHeight;

    const contentClass = cx(
      {
        [`${prefix}--modal-content`]: true,
        [`${prefix}--modal-content--with-form`]: hasForm,
        [`${prefix}--modal-scroll-content`]:
          hasScrollingContent || isScrollable,
        [`${prefix}--modal-scroll-content--no-fade`]: height <= 300,
      },
      customClassName
    );

    const hasScrollingContentProps =
      hasScrollingContent || isScrollable
        ? { tabIndex: 0, role: 'region' }
        : {};

    return (
      <Layer
        className={contentClass}
        {...hasScrollingContentProps}
        {...rest}
        ref={mergeRefs(contentRef, ref)}>
        {children}
      </Layer>
    );
  }
);

ModalBody.propTypes = {
  /**
   * Required props for the accessibility label of the header
   */
  ['aria-label']: requiredIfGivenPropIsTruthy(
    'hasScrollingContent',
    PropTypes.string
  ),

  /**
   * Specify the content to be placed in the ModalBody
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the Modal Body node
   */
  className: PropTypes.string,

  /**
   * Provide whether the modal content has a form element.
   * If `true` is used here, non-form child content should have `cds--modal-content__regular-content` class.
   */
  hasForm: PropTypes.bool,

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,
};

export interface ComposedModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the aria-label for cds--modal-container
   */
  'aria-label'?: string;

  /**
   * Specify the aria-labelledby for cds--modal-container
   */
  'aria-labelledby'?: string;

  /**
   * Specify the content to be placed in the ComposedModal
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Specify an optional className to be applied to the modal node
   */
  containerClassName?: string;

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger?: boolean;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ComposedModal` component
   */
  decorator?: ReactNode;

  /**
   * Specify whether the Modal content should have any inner padding.
   */
  isFullWidth?: boolean;

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef?: RefObject<HTMLButtonElement | null>;

  /**
   * Specify an optional handler for closing modal.
   * Returning `false` here prevents closing modal.
   */
  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
  onClose?(event: MouseEvent): void | boolean;

  /**
   * Called for all `onKeyDown` events that do not close the modal
   */
  onKeyDown?(evt: KeyboardEvent): void;

  /**
   * Specify whether the Modal is currently open
   */
  open?: boolean;

  preventCloseOnClickOutside?: boolean;

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens
   */
  selectorPrimaryFocus?: string;

  /** Specify the CSS selectors that match the floating menus. */
  selectorsFloatingMenus?: string[];

  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComposedModal` component
   */
  slug?: ReactNode;
}
const ComposedModal = React.forwardRef<HTMLDivElement, ComposedModalProps>(
  function ComposedModal({ open, ...props }, ref) {
    const id = useId();

    const enablePresence = useFeatureFlag('enable-presence');
    const hasPresenceContext = Boolean(
      useContext(ComposedModalPresenceContext)
    );
    const hasPresenceOptIn = enablePresence || hasPresenceContext;

    const exclusivePresenceContext =
      useExclusiveComposedModalPresenceContext(id);

    // if opt in and not exclusive to a presence context, wrap with presence
    if (hasPresenceOptIn && !exclusivePresenceContext) {
      return (
        <ComposedModalPresence
          open={open ?? false}
          _presenceId={id}
          // do not auto enable styles for opt-in by feature flag
          _autoEnablePresence={hasPresenceContext}>
          <ComposedModalDialog open ref={ref} {...props} />
        </ComposedModalPresence>
      );
    }

    return <ComposedModalDialog ref={ref} open={open} {...props} />;
  }
);

const ComposedModalDialog = React.forwardRef<
  HTMLDivElement,
  ComposedModalProps
>(function ComposedModalDialog(
  {
    ['aria-labelledby']: ariaLabelledBy,
    ['aria-label']: ariaLabel,
    children,
    className: customClassName,
    containerClassName,
    danger,
    decorator,
    isFullWidth,
    onClose,
    onKeyDown,
    open: externalOpen,
    preventCloseOnClickOutside,
    selectorPrimaryFocus = '[data-modal-primary-focus]',
    selectorsFloatingMenus,
    size,
    launcherButtonRef,
    slug,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const innerModal = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const startSentinel = useRef<HTMLButtonElement>(null);
  const endSentinel = useRef<HTMLButtonElement>(null);
  const onMouseDownTarget: MutableRefObject<Node | null> = useRef<Node | null>(
    null
  );

  const presenceContext = useContext(ComposedModalPresenceContext);
  const mergedRefs = useMergeRefs([ref, presenceContext?.presenceRef]);
  const enablePresence =
    useFeatureFlag('enable-presence') || presenceContext?.autoEnablePresence;

  // always mark as open when mounted with presence
  const open = externalOpen || enablePresence;
  const modalState = useComposedModalState(open);
  const [isOpen, setIsOpen] = presenceContext?.modalState ?? modalState;

  const enableDialogElement = useFeatureFlag('enable-dialog-element');
  const deprecatedFlag = useFeatureFlag(
    'enable-experimental-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinelsFlag = useFeatureFlag(
    'enable-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinels =
    deprecatedFlag || focusTrapWithoutSentinelsFlag;
  warning(
    !(focusTrapWithoutSentinels && enableDialogElement),
    '`<Modal>` detected both `focusTrapWithoutSentinels` and ' +
      '`enableDialogElement` feature flags are enabled. The native dialog ' +
      'element handles focus, so `enableDialogElement` must be off for ' +
      '`focusTrapWithoutSentinels` to have any effect.'
  );

  // Propagate open/close state to the document.body
  useEffect(() => {
    if (!enableDialogElement) {
      toggleClass(document.body, `${prefix}--body--with-modal-open`, !!open);
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open, prefix]);
  // Remove the document.body className on unmount
  useEffect(() => {
    if (!enableDialogElement) {
      return () => {
        toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
      };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleKeyDown(event) {
    if (!enableDialogElement) {
      if (
        focusTrapWithoutSentinels &&
        open &&
        match(event, keys.Tab) &&
        innerModal.current
      ) {
        wrapFocusWithoutSentinels({
          containerNode: innerModal.current,
          currentActiveNode: event.target,
          event: event,
        });
      }
    }

    onKeyDown?.(event);
  }

  function handleOnMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
    const target = evt.target as Node;
    onMouseDownTarget.current = target;
  }

  function handleOnClick(evt: React.MouseEvent<HTMLDivElement>) {
    const { target } = evt;
    const mouseDownTarget = onMouseDownTarget.current;
    evt.stopPropagation();

    const shouldCloseOnOutsideClick =
      // Passive modals can close on clicks outside the modal when
      // preventCloseOnClickOutside is undefined or explicitly set to false.
      (isPassive && !preventCloseOnClickOutside) ||
      // Non-passive modals have to explicitly opt-in for close on outside
      // behavior by explicitly setting preventCloseOnClickOutside to false,
      // rather than just leaving it undefined.
      (!isPassive && preventCloseOnClickOutside === false);

    if (
      shouldCloseOnOutsideClick &&
      target instanceof Node &&
      !elementOrParentIsFloatingMenu(target, selectorsFloatingMenus, prefix) &&
      innerModal.current &&
      !innerModal.current.contains(target) &&
      !innerModal.current.contains(mouseDownTarget)
    ) {
      closeModal(evt);
    }
  }

  function handleBlur({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }) {
    if (
      !enableDialogElement &&
      !focusTrapWithoutSentinels &&
      open &&
      currentActiveNode &&
      oldActiveNode &&
      innerModal.current
    ) {
      const { current: bodyNode } = innerModal;
      const { current: startSentinelNode } = startSentinel;
      const { current: endSentinelNode } = endSentinel;
      wrapFocus({
        bodyNode,
        startTrapNode: startSentinelNode,
        endTrapNode: endSentinelNode,
        currentActiveNode,
        oldActiveNode,
        selectorsFloatingMenus: selectorsFloatingMenus?.filter(Boolean),
        prefix,
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

  function closeModal(evt) {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  }

  const modalClass = cx(
    `${prefix}--modal`,
    {
      'is-visible': enablePresence || isOpen,
      [`${prefix}--modal--enable-presence`]:
        presenceContext?.autoEnablePresence,
      [`${prefix}--modal--danger`]: danger,
      [`${prefix}--modal--slug`]: slug,
      [`${prefix}--modal--decorator`]: decorator,
    },
    customClassName
  );

  const containerClass = cx(
    `${prefix}--modal-container`,
    size && `${prefix}--modal-container--${size}`,
    isFullWidth && `${prefix}--modal-container--full-width`,
    containerClassName
  );

  // Generate aria-label based on Modal Header label if one is not provided (L253)
  let generatedAriaLabel;
  const childrenWithProps = React.Children.toArray(children).map((child) => {
    switch (true) {
      case isElement(child) &&
        child.type === React.createElement(ModalHeader).type: {
        const el = child as ReactElement<ModalHeaderProps, typeof ModalHeader>;
        generatedAriaLabel = el.props.label;
        return React.cloneElement(el, { closeModal });
      }

      case isElement(child) &&
        child.type === React.createElement(ModalFooter).type: {
        const el = child as ReactElement<ModalFooterProps, typeof ModalFooter>;
        return React.cloneElement(el, {
          closeModal,
          inputref: button,
          danger,
        });
      }

      default:
        return child;
    }
  });

  // Modals without a footer are considered passive and carry limitations as
  // outlined in the design spec.
  const containsModalFooter = Children.toArray(childrenWithProps).some(
    (child) => isComponentElement(child, ModalFooter)
  );
  const isPassive = !containsModalFooter;
  warning(
    !(!isPassive && preventCloseOnClickOutside === false),
    '`<ComposedModal>` prop `preventCloseOnClickOutside` should not be ' +
      '`false` when `<ModalFooter>` is present. Transactional, non-passive ' +
      'Modals should not be dissmissable by clicking outside. ' +
      'See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal'
  );

  useEffect(() => {
    if (!open) return;

    const handleEscapeKey = (event) => {
      if (match(event, keys.Escape)) {
        event.preventDefault();
        event.stopPropagation();
        closeModal(event);
      }
    };
    document.addEventListener('keydown', handleEscapeKey, true);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey, true);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open]);

  useEffect(() => {
    if (!enableDialogElement && !enablePresence && !open && launcherButtonRef) {
      setTimeout(() => {
        launcherButtonRef.current?.focus();
      });
    }
  }, [enableDialogElement, enablePresence, open, launcherButtonRef]);
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

        const closeButton = focusContainerElement.querySelector(
          `.${prefix}--modal-close`
        );

        if (target) {
          target.focus();
        } else if (!target && closeButton) {
          closeButton?.focus();
        }
      };

      if (open && isOpen) {
        focusButton(innerModal.current);
      }
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open, selectorPrimaryFocus, isOpen]);

  // AILabel is always size `sm`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'sm' })
    : candidate;

  const modalBody = enableDialogElement ? (
    <Dialog
      open={open}
      focusAfterCloseRef={launcherButtonRef}
      modal
      className={containerClass}
      aria-label={ariaLabel ? ariaLabel : generatedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      data-exiting={presenceContext?.isExiting || undefined}>
      <div ref={innerModal} className={`${prefix}--modal-container-body`}>
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--modal--inner__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
        {childrenWithProps}
      </div>
    </Dialog>
  ) : (
    <div
      className={containerClass}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ? ariaLabel : generatedAriaLabel}
      aria-labelledby={ariaLabelledBy}>
      {/* Non-translatable: Focus-wrap code makes this `<button>` not actually read by screen readers */}
      {!focusTrapWithoutSentinels && (
        <button
          type="button"
          ref={startSentinel}
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </button>
      )}
      <div ref={innerModal} className={`${prefix}--modal-container-body`}>
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--modal--inner__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
        {childrenWithProps}
      </div>
      {/* Non-translatable: Focus-wrap code makes this `<button>` not actually read by screen readers */}
      {!focusTrapWithoutSentinels && (
        <button
          type="button"
          ref={endSentinel}
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </button>
      )}
    </div>
  );

  return (
    <Layer
      {...rest}
      level={0}
      role="presentation"
      ref={mergedRefs}
      aria-hidden={!open}
      onBlur={handleBlur}
      onClick={composeEventHandlers([rest?.onClick, handleOnClick])}
      onMouseDown={composeEventHandlers([rest?.onMouseDown, handleOnMouseDown])}
      onKeyDown={handleKeyDown}
      className={modalClass}
      data-exiting={presenceContext?.isExiting || undefined}>
      {modalBody}
    </Layer>
  );
});

ComposedModal.propTypes = {
  /**
   * Specify the aria-label for cds--modal-container
   */
  ['aria-label']: PropTypes.string,

  /**
   * Specify the aria-labelledby for cds--modal-container
   */
  ['aria-labelledby']: PropTypes.string,

  /**
   * Specify the content to be placed in the ComposedModal
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Specify an optional className to be applied to the modal node
   */
  containerClassName: PropTypes.string,

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger: PropTypes.bool,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ComposedModal` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the Modal content should have any inner padding.
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
   * Specify an optional handler for closing modal.
   * Returning `false` here prevents closing modal.
   */
  onClose: PropTypes.func,

  /**
   * Specify an optional handler for the `onKeyDown` event. Called for all
   * `onKeyDown` events that do not close the modal
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool,

  preventCloseOnClickOutside: PropTypes.bool,

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify the CSS selectors that match the floating menus
   */
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string.isRequired),

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `ComposedModal` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),
};

export default ComposedModal;
