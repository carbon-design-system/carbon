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

function ContainedListItem({
  action,
  children,
  className,
  disabled = false,
  onClick,
}) {
  const prefix = usePrefix();

  const isClickable = onClick !== undefined;

  const classes = classNames(`${prefix}--contained-list-item`, className, {
    [`${prefix}--contained-list-item--clickable`]: isClickable,
  });

  const content = isClickable ? (
    <>
      <button
        className={`${prefix}--contained-list-item__content`}
        type="button"
        disabled={disabled}
        onClick={onClick}>
        {children}
      </button>
      <div className={`${prefix}--contained-list-item__action`}>{action}</div>
    </>
  ) : (
    <>
      <div className={`${prefix}--contained-list-item__content`}>
        {children}
      </div>
      <div className={`${prefix}--contained-list-item__action`}>{action}</div>
    </>
  );

  return <li className={classes}>{content}</li>;
}

ContainedListItem.propTypes = {
  /**
   * A slot for a possible interactive element to render.
   */
  action: PropTypes.node,

  /**
   * The content of this item
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Whether this item is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Provide an optional function to be called when the item is clicked
   */
  onClick: PropTypes.func,
};

export default ContainedListItem;
