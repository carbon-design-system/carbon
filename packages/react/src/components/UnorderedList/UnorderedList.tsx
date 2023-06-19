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

interface UnorderedListProps extends ComponentProps<'ul'> {
  nested?: boolean | undefined;
  isExpressive?: boolean | undefined;
}

export default function UnorderedList({
  className,
  nested = false,
  isExpressive = false,
  ...other
}: UnorderedListProps) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--list--unordered`, className, {
    [`${prefix}--list--nested`]: nested,
    [`${prefix}--list--expressive`]: isExpressive,
  });
  return <ul className={classNames} {...other} />;
}

UnorderedList.propTypes = {
  /**
   * Specify a collection of ListItem's to be rendered in the UnorderedList
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the underlying `<ul>` node
   */
  className: PropTypes.string,

  /**
   * Specify whether this ordered list expressive or not
   */
  isExpressive: PropTypes.bool,

  /**
   * Specify whether the list is nested, or not
   */
  nested: PropTypes.bool,
};
