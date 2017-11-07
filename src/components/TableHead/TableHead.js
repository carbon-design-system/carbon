import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const TableHead = props => {
  const { children, className, ...other } = props;

  const tableHeadClasses = classNames(className, 'bx--table-head');

  return (
    <thead {...other} className={tableHeadClasses}>
      {children}
    </thead>
  );
};

TableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TableHead;
