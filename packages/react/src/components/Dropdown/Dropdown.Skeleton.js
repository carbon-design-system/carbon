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

const DropdownSkeleton = ({ inline, className, ...rest }) => {
  const wrapperClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--dropdown-v2`]: true,
    [`${prefix}--list-box`]: true,
    [`${prefix}--form-item`]: true,
    [`${prefix}--list-box--inline`]: inline,
  });

  return (
    <div className={wrapperClasses} {...rest}>
      <div role="button" className={`${prefix}--list-box__field`}>
        <span className={`${prefix}--list-box__label`} />
      </div>
    </div>
  );
};

DropdownSkeleton.propTypes = {
  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

DropdownSkeleton.defaultProps = {
  inline: false,
};

export default DropdownSkeleton;
