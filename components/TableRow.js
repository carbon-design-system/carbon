import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const defaultProps = {
  header: false,
};

const propTypes = {
  header: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

const TableRow = props => {
  const { header, className, children, ...other } = props;

  const tableRowClasses = classNames(className, 'bx--table-row', {
    'bx--parent-row': !header,
  });

  return (
    <tr {...other} className={tableRowClasses}>
      {children}
    </tr>
  );
};

TableRow.defaultProps = defaultProps;
TableRow.propTypes = propTypes;

export default TableRow;
