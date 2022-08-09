/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const IconSkeleton = ({ className, ...rest }) => {
  const prefix = usePrefix();
  const props = {
    ...rest,
  };

  return (
    <div className={cx(`${prefix}--icon--skeleton`, className)} {...props} />
  );
};

IconSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default IconSkeleton;
