import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from '../ComposedModal';

import classNames from 'classnames';

import toggleClass from '../../../tools/toggleClass';

import wrapFocus from '../../../internal/wrapFocus';
import { usePrefix } from '../../../internal/usePrefix';

const ComposedModal = React.forwardRef(function ComposedModal(
  {
    ['aria-labelledby']: ariaLabelledBy,
    ['aria-label']: ariaLabel,
    children,
    className,
    containerClassName,
    danger,
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

  const modalClass = classNames({
    [`${prefix}--modal`]: true,
    'is-visible': isOpen,
    [className]: className,
    [`${prefix}--modal--danger`]: danger,
  });

  const containerClass = classNames({
    [`${prefix}--modal-container`]: true,
    [`${prefix}--modal-container--${size}`]: size,
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
  });

  useEffect(() => {
    toggleClass(document.body, `${prefix}--body--with-modal-open`, open);
  }, [open, prefix]);

  useEffect(() => {
    const focusButton = (focusContainerElement) => {
      if (focusContainerElement) {
        const primaryFocusElement = focusContainerElement.querySelector(
          selectorPrimaryFocus
        );
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
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={modalClass}>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      <span
        ref={startSentinel}
        tabIndex="0"
        role="link"
        className={`${prefix}--visually-hidden`}>
        Focus sentinel
      </span>
      <div
        ref={innerModal}
        className={containerClass}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ? ariaLabel : generatedAriaLabel}
        aria-labelledby={ariaLabelledBy}>
        {childrenWithProps}
      </div>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      <span
        ref={endSentinel}
        tabIndex="0"
        role="link"
        className={`${prefix}--visually-hidden`}>
        Focus sentinel
      </span>
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
  selectorsFloatingMenus: PropTypes.string,

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
