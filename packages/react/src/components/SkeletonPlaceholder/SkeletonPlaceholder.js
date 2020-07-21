/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const SkeletonPlaceholder = ({ className, ...other }) => {
  const skeletonPlaceholderClasses = classNames({
    [`${prefix}--skeleton__placeholder`]: true,
    [className]: className,
  });

  return <div className={skeletonPlaceholderClasses} {...other} />;
};

SkeletonPlaceholder.propTypes = {
  /**
   * the class to be applied to the component
   */
  className: PropTypes.string,
};

export default SkeletonPlaceholder;
