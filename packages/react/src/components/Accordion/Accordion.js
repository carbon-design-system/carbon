/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const { prefix } = settings;

function Accordion({
  align,
  children,
  className: customClassName,
  disabled,
  ...rest
}) {
  const className = cx(`${prefix}--accordion`, customClassName, {
    [`${prefix}--accordion--${align}`]: align,
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

Accordion.defaultProps = {
  align: 'end',
};

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
};

export default Accordion;
