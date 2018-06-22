import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import TableCell from './TableCell';

const TableExpandRow = ({
  ariaLabel,
  className: rowClassName,
  children,
  isExpanded,
  onExpand,
  expandIconDescription,
  ...rest
}) => {
  const className = cx(
    {
      'bx--parent-row-v2': true,
      'bx--expandable-row-v2': isExpanded,
    },
    rowClassName
  );
  const previousValue = isExpanded ? 'collapsed' : undefined;

  return (
    <tr {...rest} className={className} data-parent-row>
      <TableCell
        className="bx--table-expand-v2"
        data-previous-value={previousValue}>
        <button
          className="bx--table-expand-v2__button"
          onClick={onExpand}
          aria-label={ariaLabel}>
          <Icon
            className="bx--table-expand-v2__svg"
            name="chevron--right"
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
};

export default TableExpandRow;
