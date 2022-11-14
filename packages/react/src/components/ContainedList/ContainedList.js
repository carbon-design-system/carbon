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

const variants = ['on-page', 'disclosed'];

function ContainedList({
  action,
  children,
  className,
  kind = variants[0],
  label,
  size = 'lg',
}) {
  const labelId = `${useId('contained-list')}-header`;
  const prefix = usePrefix();

  const classes = classNames(
    `${prefix}--contained-list`,
    `${prefix}--contained-list--${kind}`,
    `${prefix}--contained-list--${size}`,
    className
  );

  return (
    <div className={classes}>
      <div className={`${prefix}--contained-list__header`}>
        <div id={labelId} className={`${prefix}--contained-list__label`}>
          {label}
        </div>
        {action && (
          <div className={`${prefix}--contained-list__action`}>{action}</div>
        )}
      </div>
      <ul aria-labelledby={labelId}>{children}</ul>
    </div>
  );
}

ContainedList.propTypes = {
  /**
   * A slot for a possible interactive element to render.
   */
  action: PropTypes.node,

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

  /**
   * Specify the size of the contained list.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

export default ContainedList;
