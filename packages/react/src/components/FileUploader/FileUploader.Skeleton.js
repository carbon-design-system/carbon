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
import SkeletonText from '../SkeletonText';
import ButtonSkeleton from '../Button/Button.Skeleton';

const { prefix } = settings;

function FileUploaderSkeleton({ className, ...rest }) {
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      <SkeletonText heading width="100px" />
      <SkeletonText width="225px" className={`${prefix}--label-description`} />
      <ButtonSkeleton />
    </div>
  );
}

FileUploaderSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default FileUploaderSkeleton;
