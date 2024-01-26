/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { type MouseEventHandler, type PropsWithChildren } from 'react';
import { ChevronRight } from '@carbon/icons-react';
import TableCell from './TableCell';
import { usePrefix } from '../../internal/usePrefix';
import { TableRowProps } from './TableRow';

interface TableExpandRowProps extends PropsWithChildren<TableRowProps> {
  /**
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandRow
   */
  ['aria-controls']?: string;

  /**
   * @deprecated This prop has been deprecated and will be
   * removed in the next major release of Carbon. Use the
   * `aria-label` prop instead.
   */
  ariaLabel?: string;

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ['aria-label']: string;

  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  expandHeader?: string;

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription?: string;

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded: boolean;

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: MouseEventHandler<HTMLButtonElement>;
}

const TableExpandRow = React.forwardRef(
  (
    {
      ['aria-controls']: ariaControls,
      ['aria-label']: ariaLabel,
      ariaLabel: deprecatedAriaLabel,
      className: rowClassName,
      children,
      isExpanded,
      onExpand,
      expandIconDescription,
      isSelected,
      expandHeader = 'expand',
      ...rest
    }: TableExpandRowProps,
    ref: React.Ref<HTMLTableCellElement>
  ) => {
    const prefix = usePrefix();

    // We need to put the slug before the expansion arrow and all other table cells after the arrow.
    let rowHasSlug;
    const slug = React.Children.toArray(children).map((child: any) => {
      if (child.type?.displayName === 'TableSlugRow') {
        if (child.props.slug) {
          rowHasSlug = true;
        }

        return child;
      }
    });

    const normalizedChildren = React.Children.toArray(children).map(
      (child: any) => {
        if (child.type?.displayName !== 'TableSlugRow') {
          return child;
        }
      }
    );

    const className = cx(
      {
        [`${prefix}--parent-row`]: true,
        [`${prefix}--expandable-row`]: isExpanded,
        [`${prefix}--data-table--selected`]: isSelected,
        [`${prefix}--parent-row--slug`]: rowHasSlug,
      },
      rowClassName
    );
    const previousValue = isExpanded ? 'collapsed' : undefined;

    return (
      <tr {...rest} ref={ref as never} className={className} data-parent-row>
        {slug}
        <TableCell
          className={`${prefix}--table-expand`}
          data-previous-value={previousValue}
          headers={expandHeader}>
          <button
            type="button"
            className={`${prefix}--table-expand__button`}
            onClick={onExpand}
            title={expandIconDescription}
            aria-label={deprecatedAriaLabel || ariaLabel}
            aria-expanded={isExpanded}
            aria-controls={ariaControls}>
            <ChevronRight
              className={`${prefix}--table-expand__svg`}
              aria-label={expandIconDescription}
            />
          </button>
        </TableCell>
        {normalizedChildren}
      </tr>
    );
  }
);

TableExpandRow.propTypes = {
  /**
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandRow
   * TODO: make this required in v12
   */
  ['aria-controls']: PropTypes.string,

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  /**@ts-ignore*/
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: PropTypes.string,

  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  expandHeader: PropTypes.string,

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription: PropTypes.string,

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded: PropTypes.bool.isRequired,

  /**
   * Specify if the row is selected
   */
  isSelected: PropTypes.bool,

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: PropTypes.func.isRequired,
};

TableExpandRow.displayName = 'TableExpandRow';
export default TableExpandRow;
