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
import deprecate from '../../prop-types/deprecate';

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
   * Specify whether you want the inline version of this control
   */
  inline: deprecate(
    PropTypes.bool,
    `The \`inline\` prop has been deprecated and will
    be removed in the next major release. To specify the inline variant of Dropdown, please use the \`type\` prop.`
  ),
};

export default DropdownSkeleton;
