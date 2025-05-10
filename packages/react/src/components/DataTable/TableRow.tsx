/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
  /**
   * Specify if the row is selected
   */
  isSelected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableCellElement, TableRowProps>(
  (props, ref) => {
    const prefix = usePrefix();

    let rowHasAILabel;
    if (props?.children) {
      React.Children.toArray(props.children).map((child: any) => {
        if (
          child.type?.displayName === 'TableSlugRow' ||
          child.type?.displayName === 'TableDecoratorRow'
        ) {
          if (
            child.props.slug ||
            child.props.decorator?.type.displayName === 'AILabel'
          ) {
            rowHasAILabel = true;
          }
        }
      });
    }
    // Remove unnecessary props if provided to this component, these are
    // only useful in `TableExpandRow`
    const className = cx(props.className, {
      [`${prefix}--data-table--selected`]: props.isSelected,
      [`${prefix}--data-table--slug-row ${prefix}--data-table--ai-label-row`]:
        rowHasAILabel,
    });

    const {
      ariaLabel,
      'aria-label': ariaLabelAlt,
      'aria-controls': ariaControls,
      onExpand,
      isExpanded,
      isSelected,
      ...cleanProps
    } = props as any;

    if (className) {
      cleanProps.className = className;
    }

    return <tr ref={ref} {...cleanProps} />;
  }
);

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
