import React, {
  useRef,
  useEffect,
  useState,
  type MouseEvent,
  type KeyboardEvent,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
  type RefObject,
} from 'react';
import { isElement } from 'react-is';
import PropTypes, { ReactNodeLike } from 'prop-types';
import { ModalHeader, type ModalHeaderProps } from './ModalHeader';
import { ModalFooter, type ModalFooterProps } from './ModalFooter';
import debounce from 'lodash.debounce';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import mergeRefs from '../../tools/mergeRefs';
import cx from 'classnames';
import toggleClass from '../../tools/toggleClass';
import requiredIfGivenPropIsTruthy from '../../prop-types/requiredIfGivenPropIsTruthy';
import wrapFocus, { wrapFocusWithoutSentinels } from '../../internal/wrapFocus';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useFeatureFlag } from '../FeatureFlags';

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
    const [isScrollable, setIsScrollable] = useState(false);
    const contentClass = cx(
      {
        [`${prefix}--modal-content`]: true,
        [`${prefix}--modal-content--with-form`]: hasForm,
        [`${prefix}--modal-scroll-content`]:
          hasScrollingContent || isScrollable,
      },
      customClassName
    );

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

    const hasScrollingContentProps =
      hasScrollingContent || isScrollable
        ? { tabIndex: 0, role: 'region' }
        : {};

    return (
      <div
        className={contentClass}
        {...hasScrollingContentProps}
        {...rest}
        ref={mergeRefs(contentRef, ref)}>
        {children}
      </div>
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
   * Specify whether the Modal content should have any inner padding.
   */
  isFullWidth?: boolean;

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef?: RefObject<HTMLButtonElement>;

  /**
   * Specify an optional handler for closing modal.
   * Returning `false` here prevents closing modal.
   */
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
  selectorsFloatingMenus?: Array<string | null | undefined>;

  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComposedModal` component
   */
  slug?: ReactNodeLike;
}

const ComposedModal = React.forwardRef<HTMLDivElement, ComposedModalProps>(
  function ComposedModal(
    {
      ['aria-labelledby']: ariaLabelledBy,
      ['aria-label']: ariaLabel,
      children,
      className: customClassName,
      containerClassName,
      danger,
      isFullWidth,
      onClose,
      onKeyDown,
      open,
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
    const [isOpen, setIsOpen] = useState<boolean>(!!open);
    const [wasOpen, setWasOpen] = useState<boolean>(!!open);
    const innerModal = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const startSentinel = useRef<HTMLButtonElement>(null);
    const endSentinel = useRef<HTMLButtonElement>(null);
    const focusTrapWithoutSentinels = useFeatureFlag(
      'enable-experimental-focus-wrap-without-sentinels'
    );

    // Keep track of modal open/close state
    // and propagate it to the document.body
    useEffect(() => {
      if (open !== wasOpen) {
        setIsOpen(!!open);
        setWasOpen(!!open);
        toggleClass(document.body, `${prefix}--body--with-modal-open`, !!open);
      }
    }, [open, wasOpen, prefix]);
    // Remove the document.body className on unmount
    useEffect(() => {
      return () => {
        toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleKeyDown(event) {
      event.stopPropagation();
      if (match(event, keys.Escape)) {
        closeModal(event);
      }

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

      onKeyDown?.(event);
    }
    function handleMousedown(evt: MouseEvent) {
      evt.stopPropagation();
      const isInside = innerModal.current?.contains(evt.target as Node);
      if (!isInside && !preventCloseOnClickOutside) {
        closeModal(evt);
      }
    }

    function handleBlur({
      target: oldActiveNode,
      relatedTarget: currentActiveNode,
    }) {
      if (open && currentActiveNode && oldActiveNode && innerModal.current) {
        const { current: bodyNode } = innerModal;
        const { current: startSentinelNode } = startSentinel;
        const { current: endSentinelNode } = endSentinel;
        wrapFocus({
          bodyNode,
          startTrapNode: startSentinelNode,
          endTrapNode: endSentinelNode,
          currentActiveNode,
          oldActiveNode,
          selectorsFloatingMenus: selectorsFloatingMenus?.filter(
            Boolean
          ) as string[],
        });
      }
    }

    function closeModal(evt) {
      if (!onClose || onClose(evt) !== false) {
        setIsOpen(false);
      }
    }

    const modalClass = cx(
      `${prefix}--modal`,
      {
        'is-visible': isOpen,
        [`${prefix}--modal--danger`]: danger,
        [`${prefix}--modal--slug`]: slug,
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
          const el = child as ReactElement<
            ModalHeaderProps,
            typeof ModalHeader
          >;
          generatedAriaLabel = el.props.label;
          return React.cloneElement(el, { closeModal });
        }

        case isElement(child) &&
          child.type === React.createElement(ModalFooter).type: {
          const el = child as ReactElement<
            ModalFooterProps,
            typeof ModalFooter
          >;
          return React.cloneElement(el, { closeModal, inputref: button });
        }

        default:
          return child;
      }
    });

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
          ? containerElement.querySelector(selectorPrimaryFocus)
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

      if (open && isOpen) {
        focusButton(innerModal.current);
      }
    }, [open, selectorPrimaryFocus, isOpen]);

    // Slug is always size `lg`
    let normalizedSlug;
    if (slug && slug['type']?.displayName === 'Slug') {
      normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
        size: 'lg',
      });
    }

    return (
      <div
        {...rest}
        role="presentation"
        ref={ref}
        aria-hidden={!open}
        onBlur={!focusTrapWithoutSentinels ? handleBlur : () => {}}
        onMouseDown={handleMousedown}
        onKeyDown={handleKeyDown}
        className={modalClass}>
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
            {normalizedSlug}
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
      </div>
    );
  }
);

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
   * Specify whether the Modal content should have any inner padding.
   */
  isFullWidth: PropTypes.bool,

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  // @ts-expect-error: Invalid derived type
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
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComposedModal` component
   */
  slug: PropTypes.node,
};

export default ComposedModal;
