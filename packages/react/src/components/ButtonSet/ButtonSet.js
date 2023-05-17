/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const ButtonSet = React.forwardRef(function ButtonSet(
  { children, className, stacked, ...rest },
  ref
) {
  const prefix = usePrefix();
  const buttonSetClasses = classNames(className, `${prefix}--btn-set`, {
    [`${prefix}--btn-set--stacked`]: stacked,
  });
  return (
    <div {...rest} className={buttonSetClasses} ref={ref}>
      {children}
    </div>
  );
});

ButtonSet.displayName = 'ButtonSet';
ButtonSet.propTypes = {
  /**
   * Specify the content of your ButtonSet
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your ButtonSet
   */
  className: PropTypes.string,

  /**
   * Specify the button arrangement of the set (vertically stacked or
   * horizontal)
   */
  stacked: PropTypes.bool,
};

export default ButtonSet;
