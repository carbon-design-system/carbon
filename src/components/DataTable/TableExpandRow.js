/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { iconChevronRight } from 'carbon-icons';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import TableCell from './TableCell';

const { prefix } = settings;

const TableExpandRow = ({
  ariaLabel,
  className: rowClassName,
  children,
  isExpanded,
  onExpand,
  expandIconDescription,
  isSelected,
  expandHeader,
  ...rest
}) => {
  const className = cx(
    {
      [`${prefix}--parent-row-v2`]: true,
      [`${prefix}--expandable-row-v2`]: isExpanded,
      [`${prefix}--data-table-v2--selected`]: isSelected,
    },
    rowClassName
  );
  const previousValue = isExpanded ? 'collapsed' : undefined;

  return (
    <tr {...rest} className={className} data-parent-row>
      <TableCell
        className={`${prefix}--table-expand-v2`}
        data-previous-value={previousValue}
        headers={expandHeader}>
        <button
          className={`${prefix}--table-expand-v2__button`}
          onClick={onExpand}
          aria-label={ariaLabel}>
          <Icon
            className={`${prefix}--table-expand-v2__svg`}
            icon={iconChevronRight}
            description={expandIconDescription}
          />
        </button>
      </TableCell>
      {children}
    </tr>
  );
};

TableExpandRow.propTypes = {
  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExapndedRow` work together
   */
  isExpanded: PropTypes.bool.isRequired,

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: PropTypes.func.isRequired,

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription: PropTypes.string,

  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  expandHeader: PropTypes.string,
};

TableExpandRow.defaultProps = {
  expandHeader: 'expand',
};

export default TableExpandRow;
