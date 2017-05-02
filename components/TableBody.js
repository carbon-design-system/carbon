import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const TableBody = props => {
  const { children, className, ...other } = props;

  const tableBodyClasses = classNames(className, 'bx--table-body');

  return (
    <tbody {...other} className={tableBodyClasses}>
      {children}
    </tbody>
  );
};

TableBody.propTypes = propTypes;

export default TableBody;
