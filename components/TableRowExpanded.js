import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  colSpan: PropTypes.number,
  expanded: PropTypes.bool,
  even: PropTypes.bool,
};

const defaultProps = {
  expanded: false,
};

const TableRowExpanded = props => {
  const { children, className, even, colSpan, expanded, ...other } = props;

  const tableRowClasses = classNames({
    [className]: className,
    'bx--table-row': true,
    'bx--expandable-row': true,
    'bx--expandable-row--even': even,
  });

  if (!expanded) {
    return false;
  }

  return (
    <tr {...other} className={tableRowClasses}>
      <td colSpan={colSpan}>{children}</td>
    </tr>
  );
};

TableRowExpanded.propTypes = propTypes;
TableRowExpanded.defaultProps = defaultProps;

export default TableRowExpanded;
