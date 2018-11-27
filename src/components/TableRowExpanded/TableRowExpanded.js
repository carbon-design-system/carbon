import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableRowExpanded = props => {
  const { children, className, even, colSpan, expanded, ...other } = props;

  const tableRowClasses = classNames({
    [className]: className,
    [`${prefix}--table-row`]: true,
    [`${prefix}--expandable-row`]: true,
    [`${prefix}--expandable-row--even`]: even,
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

TableRowExpanded.propTypes = {
  /**
   * Provide the contents of your TableRowExpanded
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to your TableRowExpanded
   */
  className: PropTypes.string,

  /**
   * Specify the `colspan` of your TableRowExpanded
   */
  colSpan: PropTypes.number,

  /**
   * Specify whether your TableRowExpanded is activated
   */
  expanded: PropTypes.bool,

  /**
   * Specify whether your TableRowExpanded is at an even position
   */
  even: PropTypes.bool,
};

TableRowExpanded.defaultProps = {
  expanded: false,
};

export default TableRowExpanded;
