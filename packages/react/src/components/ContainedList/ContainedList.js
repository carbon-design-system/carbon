/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';

const variants = ['variantone', 'varianttwo'];

function ContainedList({ children, className, kind = variants[0], label }) {
  const labelId = useId('contained-list');
  const prefix = usePrefix();

  const classes = classNames(
    `${prefix}--contained-list`,
    `${prefix}--contained-list--${kind}`,
    className
  );

  return (
    <div className={classes}>
      <span id={labelId} className={`${prefix}--contained-list__header`}>
        {label}
      </span>
      <ul aria-labelledby={labelId}>{children}</ul>
    </div>
  );
}

ContainedList.propTypes = {
  /**
   * A collection of ContainedListItems to be rendered in the ContainedList
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * The kind of ContainedList you want to display
   */
  kind: PropTypes.oneOf(variants),

  /**
   * A label describing the contained list.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default ContainedList;
