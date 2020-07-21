/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

function TagSkeleton({ className, ...rest }) {
  return (
    <span
      className={cx(`${prefix}--tag`, `${prefix}--skeleton`, className)}
      {...rest}
    />
  );
}

TagSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default TagSkeleton;
