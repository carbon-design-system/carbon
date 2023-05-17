/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';

export interface TableRowProps extends ReactAttr<HTMLTableRowElement> {
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
  /**
   * Specify if the row is selected
   */
  isSelected?: boolean;
}

const TableRow = (props: TableRowProps) => {
  const prefix = usePrefix();
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const className = cx(props.className, {
    [`${prefix}--data-table--selected`]: props.isSelected,
  });
  const cleanProps = {
    ...omit(props, ['ariaLabel', 'onExpand', 'isExpanded', 'isSelected']),
    className: className || undefined,
  };
  return <tr {...cleanProps} />;
};

TableRow.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify if the row is selected
   */
  isSelected: PropTypes.bool,
};

export default TableRow;
