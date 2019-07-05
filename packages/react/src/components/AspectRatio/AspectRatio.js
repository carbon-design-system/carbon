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

const ratios = ['16x9', '2x1', '4x3', '1x1', '1x2'];
const { prefix } = settings;

function AspectRatio({
  className: customClassName,
  children,
  ratio = '1x1',
  ...rest
}) {
  const className = cx({
    [`${prefix}--aspect-ratio`]: true,
    [`${prefix}--aspect-ratio--${ratio}`]: true,
    [customClassName]: !!customClassName,
  });
  return (
    <div className={className} {...rest}>
      <div className="bx--aspect-ratio--object">{children}</div>
    </div>
  );
}

AspectRatio.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Pass in the children that will be rendered within the aspect ratio object
   */
  children: PropTypes.node,

  /**
   * Specify the aspect ratio for the container
   */
  ratio: PropTypes.oneOf(ratios),
};

export default AspectRatio;
