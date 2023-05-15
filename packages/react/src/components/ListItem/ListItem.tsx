/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ComponentProps } from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

type ListItemProps = ComponentProps<'li'>;

export default function ListItem({ className, ...other }: ListItemProps) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--list__item`, className);
  return <li className={classNames} {...other} />;
}

ListItem.propTypes = {
  /**
   * Specify the content for the ListItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to apply to the underlying `<li>` node
   */
  className: PropTypes.string,
};
