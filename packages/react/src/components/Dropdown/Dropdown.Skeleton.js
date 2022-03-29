/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { PropTypes as ListBoxPropTypes } from '../ListBox';
import { usePrefix } from '../../internal/usePrefix';

const DropdownSkeleton = ({ className, size, ...rest }) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--dropdown-v2`]: true,
    [`${prefix}--list-box`]: true,
    [`${prefix}--form-item`]: true,
    [`${prefix}--list-box--${size}`]: size,
  });

  return (
    <div className={wrapperClasses} {...rest}>
      <div className={`${prefix}--list-box__field`}>
        <span className={`${prefix}--list-box__label`} />
      </div>
    </div>
  );
};

DropdownSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the size of the ListBox.
   */
  size: ListBoxPropTypes.ListBoxSize,
};

export default DropdownSkeleton;
