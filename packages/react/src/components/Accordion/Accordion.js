/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';
import React from 'react';

function Accordion({
  align = 'end',
  children,
  className: customClassName,
  disabled = false,
  isFlush = false,
  size,
  ...rest
}) {
  const prefix = usePrefix();

  const className = cx(`${prefix}--accordion`, customClassName, {
    [`${prefix}--accordion--${align}`]: align,
    [`${prefix}--accordion--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--accordion--flush`]: isFlush && align !== 'start',
  });
  return (
    <ul className={className} {...rest}>
      {disabled
        ? React.Children.toArray(children).map((child) => {
            return React.cloneElement(child, { disabled });
          })
        : children}
    </ul>
  );
}

Accordion.propTypes = {
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: PropTypes.oneOf(['start', 'end']),

  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether Accordion text should be flush, default is false, does not work with align="start"
   */
  isFlush: PropTypes.bool,

  /**
   * Specify the size of the Accordion. Currently supports the following:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Accordion;
