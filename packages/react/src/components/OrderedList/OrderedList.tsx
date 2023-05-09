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

interface OrderedListProps extends ComponentProps<'ol'> {
  nested?: boolean | undefined;
  native?: boolean | undefined;
  isExpressive?: boolean | undefined;
}

export default function OrderedList({
  className,
  nested = false,
  native = false,
  isExpressive = false,
  ...other
}: OrderedListProps) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--list--ordered`]: !native,
      [`${prefix}--list--ordered--native`]: native,
      [`${prefix}--list--nested`]: nested,
      [`${prefix}--list--expressive`]: isExpressive,
    },
    className
  );
  return <ol className={classNames} {...other} />;
}

OrderedList.propTypes = {
  /**
   * Provide list items to be rendered in the ordered list
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the containing <ol> node
   */
  className: PropTypes.string,

  /**
   * Specify whether this ordered list expressive or not
   */
  isExpressive: PropTypes.bool,

  /**
   * Specify whether this ordered list should use native list styles instead of custom counter
   */
  native: PropTypes.bool,

  /**
   * Specify whether this ordered list is nested inside of another nested list
   */
  nested: PropTypes.bool,
};
