/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

function unstable_Grid({
  as = 'div',
  className: customClassName,
  condensed,
  fullWidth,
  ...rest
}) {
  const className = cx({
    [`${prefix}--grid`]: true,
    [`${prefix}--grid--condensed`]: condensed,
    [`${prefix}--grid--full-width`]: fullWidth,
    [customClassName]: !!customClassName,
  });
  return React.createElement(as, {
    ...rest,
    className,
  });
}

unstable_Grid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Provide a custom className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify if the grid should be rendered as a condensed grid
   */
  condensed: PropTypes.bool,

  /**
   * Specify if the grid should span full-width at the maximum breakpoint
   */
  fullWidth: PropTypes.bool,
};

export default unstable_Grid;
