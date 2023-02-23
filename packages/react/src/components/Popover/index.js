/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState, useMemo } from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

const PopoverContext = React.createContext({
  floating: {
    current: null,
  },
});

const Popover = React.forwardRef(function Popover(props, forwardRef) {
  const {
    align = 'bottom',
    as: BaseComponent = 'span',
    autoAlign = false,
    caret = true,
    className: customClassName,
    children,
    dropShadow = true,
    highContrast = false,
    open,
    ...rest
  } = props;
  const prefix = usePrefix();
  const floating = useRef();
  const popover = useRef();

  const value = useMemo(() => {
    return {
      floating,
    };
  }, []);

  const ref = useMergedRefs([forwardRef, popover]);
  const [autoAligned, setAutoAligned] = useState(false);
  const [autoAlignment, setAutoAlignment] = useState(align);
  const className = cx({
    [`${prefix}--popover-container`]: true,
    [`${prefix}--popover--caret`]: caret,
    [`${prefix}--popover--drop-shadow`]: dropShadow,
    [`${prefix}--popover--high-contrast`]: highContrast,
    [`${prefix}--popover--open`]: open,
    [`${prefix}--popover--${autoAlignment}`]: autoAligned,
    [`${prefix}--popover--${align}`]: !autoAligned,
    [customClassName]: !!customClassName,
  });

  useIsomorphicEffect(() => {
    if (!open) {
      return;
    }

    if (!autoAlign) {
      setAutoAligned(false);
      return;
    }

    if (!floating.current) {
      return;
    }

    if (autoAligned === true) {
      return;
    }

    const rect = floating.current.getBoundingClientRect();

    // The conditions, per side, of when the popover is not visible, excluding the popover's internal padding(16)
    const conditions = {
      left: rect.x < -16,
      top: rect.y < -16,
      right: rect.x + (rect.width - 16) > document.documentElement.clientWidth,
      bottom:
        rect.y + (rect.height - 16) > document.documentElement.clientHeight,
    };

    if (
      !conditions.left &&
      !conditions.top &&
      !conditions.right &&
      !conditions.bottom
    ) {
      setAutoAligned(false);
      return;
    }

    const alignments = [
      'top',
      'top-left',
      'right-bottom',
      'right',
      'right-top',
      'bottom-left',
      'bottom',
      'bottom-right',
      'left-top',
      'left',
      'left-bottom',
      'top-right',
    ];

    // Creates the prioritized list of options depending on ideal alignment coming from `align`
    const options = [align];
    let option =
      alignments[(alignments.indexOf(align) + 1) % alignments.length];

    while (option) {
      if (options.includes(option)) {
        break;
      }
      options.push(option);
      option = alignments[(alignments.indexOf(option) + 1) % alignments.length];
    }

    function isVisible(alignment) {
      popover.current.classList.add(`${prefix}--popover--${alignment}`);

      const rect = floating.current.getBoundingClientRect();

      // Check if popover is not visible to the left of the screen
      if (rect.x < -16) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      // Check if popover is not visible at the top of the screen
      if (rect.y < -16) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      // Check if popover is not visible to right of screen
      if (rect.x + (rect.width - 16) > document.documentElement.clientWidth) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      // Check if popover is not visible to bottom of screen
      if (rect.y + (rect.height - 16) > document.documentElement.clientHeight) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      popover.current.classList.remove(`${prefix}--popover--${alignment}`);
      return true;
    }

    let alignment = null;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];

      if (isVisible(option)) {
        alignment = option;
        break;
      }
    }

    if (alignment) {
      setAutoAligned(true);
      setAutoAlignment(alignment);
    }
  }, [autoAligned, align, autoAlign, prefix, open]);

  return (
    <PopoverContext.Provider value={value}>
      <BaseComponent {...rest} className={className} ref={ref}>
        {children}
      </BaseComponent>
    </PopoverContext.Provider>
  );
});

// Note: this displayName is temporarily set so that Storybook ArgTable
// correctly displays the name of this component
if (__DEV__) {
  Popover.displayName = 'Popover';
}

Popover.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
   */
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',

    'bottom',
    'bottom-left',
    'bottom-right',

    'left',
    'left-bottom',
    'left-top',

    'right',
    'right-bottom',
    'right-top',
  ]),

  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to futurue changes.
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify whether a caret should be rendered
   */
  caret: PropTypes.bool,

  /**
   * Provide elements to be rendered inside of the component
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,

  /**
   * Specify whether a drop shadow should be rendered on the popover
   */
  dropShadow: PropTypes.bool,

  /**
   * Render the component using the high-contrast variant
   */
  highContrast: PropTypes.bool,

  /**
   * Specify whether the component is currently open or closed
   */
  open: PropTypes.bool.isRequired,
};

const PopoverContent = React.forwardRef(function PopoverContent(
  { className, children, ...rest },
  forwardRef
) {
  const prefix = usePrefix();
  const { floating } = React.useContext(PopoverContext);
  const ref = useMergedRefs([floating, forwardRef]);
  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span className={cx(`${prefix}--popover-content`, className)} ref={ref}>
        {children}
      </span>
      <span className={`${prefix}--popover-caret`} />
    </span>
  );
});

PopoverContent.propTypes = {
  /**
   * Provide elements to be rendered inside of the component
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};

export { Popover, PopoverContent };
