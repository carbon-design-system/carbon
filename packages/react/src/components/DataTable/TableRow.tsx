/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children, forwardRef, type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import TableSlugRow from './TableSlugRow';
import TableDecoratorRow from './TableDecoratorRow';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import type { TableRowExpandInteropProps } from './TableExpandRow';

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    TableRowExpandInteropProps {
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
}

const frFn = forwardRef<HTMLTableRowElement, TableRowProps>;

const TableRow = frFn((props, ref) => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const {
    ariaLabel, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    'aria-label': ariaLabelAlt, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    'aria-controls': ariaControls, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    onExpand, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    isExpanded, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    isSelected,
    ...cleanProps
  } = props;

  const prefix = usePrefix();

  const rowHasAILabel = Children.toArray(props.children).some((child) => {
    if (isComponentElement(child, TableSlugRow)) {
      return !!child.props.slug;
    }

    return (
      isComponentElement(child, TableDecoratorRow) &&
      isComponentElement(child.props.decorator, AILabel)
    );
  });

  const className = cx(props.className, {
    [`${prefix}--data-table--selected`]: isSelected,
    [`${prefix}--data-table--slug-row ${prefix}--data-table--ai-label-row`]:
      rowHasAILabel,
  });

  if (className) {
    cleanProps.className = className;
  }

  return <tr ref={ref} {...cleanProps} />;
});

TableRow.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * Specify if the row is selected
   */
  isSelected: PropTypes.bool,
  /**
   * Non-standard alias for `aria-label`.
   */
  ariaLabel: PropTypes.string,
  /**
   * Accessible label for the row element.
   */
  'aria-label': PropTypes.string,
  /**
   * Associates this row with the id of the corresponding expanded row content.
   */
  'aria-controls': PropTypes.string,
  /**
   * Handler called when the row’s expand toggle is clicked.
   */
  onExpand: PropTypes.func,
  /**
   * Flag indicating whether the row is currently expanded.
   */
  isExpanded: PropTypes.bool,
};

export default TableRow;
