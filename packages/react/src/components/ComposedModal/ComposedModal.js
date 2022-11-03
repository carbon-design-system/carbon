import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';

import cx from 'classnames';

import toggleClass from '../../tools/toggleClass';
import requiredIfGivenPropIsTruthy from '../../prop-types/requiredIfGivenPropIsTruthy';

import wrapFocus from '../../internal/wrapFocus';
import { usePrefix } from '../../internal/usePrefix';

export const ModalBody = React.forwardRef(function ModalBody(
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
  const contentClass = cx({
    [`${prefix}--modal-content`]: true,
    [`${prefix}--modal-content--with-form`]: hasForm,
    [`${prefix}--modal-scroll-content`]: hasScrollingContent,
    [customClassName]: customClassName,
  });
  const hasScrollingContentProps = hasScrollingContent
    ? {
        tabIndex: 0,
        role: 'region',
      }
    : {};
  return (
    <>
      <div
        className={contentClass}
        {...hasScrollingContentProps}
        {...rest}
        ref={ref}>
        {children}
      </div>
      {hasScrollingContent && (
        <div className={`${prefix}--modal-content--overflow-indicator`} />
      )}
    </>
  );
});

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
   * If `true` is used here, non-form child content should have `bx--modal-content__regular-content` class.
   */
  hasForm: PropTypes.bool,

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,
};

const ComposedModal = React.forwardRef(function ComposedModal(
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
    selectorPrimaryFocus,
    selectorsFloatingMenus,
    size,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const [isOpen, setisOpen] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);
  const innerModal = useRef();
  const button = useRef();
  const startSentinel = useRef();
  const endSentinel = useRef();

  if (open !== prevOpen) {
    setisOpen(open);
    setPrevOpen(open);
  }

  function handleKeyDown(evt) {
    // Esc key
    if (evt.which === 27) {
      closeModal(evt);
    }

    onKeyDown(evt);
  }

  function handleClick(evt) {
    if (
      !innerModal.current.contains(evt.target) &&
      preventCloseOnClickOutside
    ) {
      return;
    }
    if (innerModal.current && !innerModal.current.contains(evt.target)) {
      closeModal(evt);
    }
  }

  function handleBlur({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }) {
    if (open && currentActiveNode && oldActiveNode) {
      const { current: bodyNode } = innerModal;
      const { current: startSentinelNode } = startSentinel;
      const { current: endSentinelNode } = endSentinel;
      wrapFocus({
        bodyNode,
        startSentinelNode,
        endSentinelNode,
        currentActiveNode,
        oldActiveNode,
        selectorsFloatingMenus,
      });
    }
  }

  function closeModal(evt) {
    if (!onClose || onClose(evt) !== false) {
      setisOpen(false);
    }
  }

  const modalClass = cx({
    [`${prefix}--modal`]: true,
    'is-visible': isOpen,
    [customClassName]: customClassName,
    [`${prefix}--modal--danger`]: danger,
  });

  const containerClass = cx({
    [`${prefix}--modal-container`]: true,
    [`${prefix}--modal-container--${size}`]: size,
    [`${prefix}--modal-container--full-width`]: isFullWidth,
    [containerClassName]: containerClassName,
  });

  // Generate aria-label based on Modal Header label if one is not provided (L253)
  let generatedAriaLabel;
  const childrenWithProps = React.Children.toArray(children).map((child) => {
    switch (child.type) {
      case React.createElement(ModalHeader).type:
        generatedAriaLabel = child.props.label;
        return React.cloneElement(child, {
          closeModal: closeModal,
        });
      case React.createElement(ModalFooter).type:
        return React.cloneElement(child, {
          closeModal: closeModal,
          inputref: button,
        });
      default:
        return child;
    }
  });

  useEffect(() => {
    if (prevOpen !== isOpen) {
      toggleClass(document.body, `${prefix}--body--with-modal-open`, isOpen);
    }
  });

  useEffect(() => {
    return () =>
      toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    toggleClass(document.body, `${prefix}--body--with-modal-open`, open);
  }, [open, prefix]);

  useEffect(() => {
    const focusButton = (focusContainerElement) => {
      if (focusContainerElement) {
        const primaryFocusElement =
          focusContainerElement.querySelector(selectorPrimaryFocus);
        if (primaryFocusElement) {
          primaryFocusElement.focus();
          return;
        }
        if (button.current) {
          button.current.focus();
        }
      }
    };

    if (!open) {
      return;
    }

    if (innerModal.current) {
      focusButton(innerModal.current);
    }
  }, [open, selectorPrimaryFocus]);

  return (
    <div
      {...rest}
      role="presentation"
      ref={ref}
      aria-hidden={!open}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={modalClass}
      tabIndex="-1">
      <div
        className={containerClass}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ? ariaLabel : generatedAriaLabel}
        aria-labelledby={ariaLabelledBy}>
        {/* Non-translatable: Focus-wrap code makes this `<button>` not actually read by screen readers */}
        <button
          type="button"
          ref={startSentinel}
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </button>
        <div ref={innerModal} className={`${prefix}--modal-container-body`}>
          {childrenWithProps}
        </div>
        {/* Non-translatable: Focus-wrap code makes this `<button>` not actually read by screen readers */}
        <button
          type="button"
          ref={endSentinel}
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </button>
      </div>
    </div>
  );
});

ComposedModal.propTypes = {
  /**
   * Specify the aria-label for bx--modal-container
   */
  ['aria-label']: PropTypes.string,

  /**
   * Specify the aria-labelledby for bx--modal-container
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
   * Specify whether or not the Modal content should have any inner padding.
   */
  isFullWidth: PropTypes.bool,

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
};

ComposedModal.defaultProps = {
  onKeyDown: () => {},
  selectorPrimaryFocus: '[data-modal-primary-focus]',
};

export default ComposedModal;
