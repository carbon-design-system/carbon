/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

function Popover({
  align = 'bottom',
  as: BaseComponent = 'div',
  caret = true,
  className: customClassName,
  children,
  dropShadow = true,
  highContrast = false,
  light = false,
  open,
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--popover-container`]: true,
    [`${prefix}--popover--caret`]: caret,
    [`${prefix}--popover--drop-shadow`]: dropShadow,
    [`${prefix}--popover--high-contrast`]: highContrast,
    [`${prefix}--popover--light`]: light,
    [`${prefix}--popover--open`]: open,
    [`${prefix}--popover--${align}`]: true,
    [customClassName]: !!customClassName,
  });

  return (
    <BaseComponent {...rest} className={className}>
      {children}
    </BaseComponent>
  );
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
   * Render the component using the light variant
   */
  light: PropTypes.bool,

  /**
   * Specify whether the component is currently open or closed
   */
  open: PropTypes.bool.isRequired,
};

function PopoverContent({ className, children, ...rest }) {
  const prefix = usePrefix();
  return (
    <div {...rest} className={`${prefix}--popover`}>
      <div className={cx(`${prefix}--popover-content`, className)}>
        {children}
      </div>
      <span className={`${prefix}--popover-caret`} />
    </div>
  );
}

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
