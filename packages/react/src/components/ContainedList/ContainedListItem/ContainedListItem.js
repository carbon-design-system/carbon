/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';

function ContainedListItem({ children, className, onClick }) {
  const prefix = usePrefix();

  const isClickable = onClick !== undefined;

  const classes = classNames(`${prefix}--contained-list-item`, className, {
    [`${prefix}--contained-list-item--clickable`]: isClickable,
  });

  const content = isClickable ? (
    <button
      className={`${prefix}--contained-list-item__content`}
      type="button"
      onClick={onClick}>
      {children}
    </button>
  ) : (
    <div className={`${prefix}--contained-list-item__content`}>{children}</div>
  );

  return <li className={classes}>{content}</li>;
}

ContainedListItem.propTypes = {
  /**
   * The content of this item
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Provide an optional function to be called when the item is clicked
   */
  onClick: PropTypes.func,
};

export default ContainedListItem;
