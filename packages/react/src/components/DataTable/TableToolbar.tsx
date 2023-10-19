/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

export interface TableToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the TableToolbar component.
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * 'aria-label' of the TableToolbar component.
   */
  ariaLabel?: string;

  /**
   * Pass in the children that will be rendered inside the TableToolbar
   */
  children: React.ReactNode;

  /**
   * `lg` Change the row height of table
   */
  size?: 'sm' | 'lg';
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  ['aria-label']: ariaLabel = 'data table toolbar',
  ariaLabel: deprecatedAriaLabel,
  children,
  size,
  ...rest
}) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--table-toolbar`]: true,
    [`${prefix}--table-toolbar--${size}`]: size,
  });
  return (
    <section
      aria-label={deprecatedAriaLabel || ariaLabel}
      {...rest}
      className={className}>
      {children}
    </section>
  );
};

TableToolbar.propTypes = {
  /**
   * 'aria-label' of the TableToolbar component.
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container node.
   * 'aria-label' of the TableToolbar component.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Pass in the children that will be rendered inside the TableToolbar
   */
  children: PropTypes.node,

  /**
   * `lg` Change the row height of table
   */
  size: PropTypes.oneOf(['sm', 'lg']),
};

export default TableToolbar;
