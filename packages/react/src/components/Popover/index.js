/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { runInContext } from 'lodash';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

const PopoverContext = React.createContext();

const Popover = React.forwardRef(function Popover(props, ref) {
  const {
    align = 'bottom',
    as: BaseComponent = 'span',
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
  const className = cx({
    [`${prefix}--popover-container`]: true,
    [`${prefix}--popover--caret`]: caret,
    [`${prefix}--popover--drop-shadow`]: dropShadow,
    [`${prefix}--popover--high-contrast`]: highContrast,
    [`${prefix}--popover--open`]: open,
    [`${prefix}--popover--${align}`]: true,
    [customClassName]: !!customClassName,
  });

  useLayoutEffect(() => {
    if (floating.current) {
      const rect = floating.current.getBoundingClientRect();

      console.log(rect.x);
    }
  }, [floating.current]);

  return (
    <PopoverContext.Provider value={{ floating }}>
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
  ref
) {
  const prefix = usePrefix();
  const { floating } = React.useContext(PopoverContext);

  const mergedRef = useMergedRefs([floating, ref]);
  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span
        className={cx(`${prefix}--popover-content`, className)}
        ref={mergedRef}>
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
