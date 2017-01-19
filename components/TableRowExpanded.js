import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  colSpan: PropTypes.number,
  expanded: PropTypes.bool,
};

const defaultProps = {
  expanded: false,
};

const TableRowExpanded = (props) => {
  const {
    children,
    className,
    colSpan,
    expanded,
    ...other,
  } = props;

  const tableRowClasses = classNames(
    className,
    'bx--table-row',
    'bx--expandable-row',
  );

  if (!expanded) {
    return false;
  }

  return (
    <tr
      {...other}
      className={tableRowClasses}
    >
      <td colSpan={colSpan}>
        {children}
      </td>
    </tr>
  );
};

TableRowExpanded.propTypes = propTypes;
TableRowExpanded.defaultProps = defaultProps;

export default TableRowExpanded;

