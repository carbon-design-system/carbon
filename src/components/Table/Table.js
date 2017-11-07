import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Table = props => {
  const { children, className, containerClassName, ...other } = props;

  const tableClasses = classNames(className, 'bx--responsive-table');

  const tableContainerClasses = classNames(
    containerClassName,
    'bx--responsive-table-container'
  );

  return (
    <div className={tableContainerClasses}>
      <table
        {...other}
        className={tableClasses}
        style={{
          borderCollapse: 'collapse',
          borderSpacing: 0,
        }}>
        {children}
      </table>
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Table;
