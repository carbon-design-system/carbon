import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/responsiveTables/responsiveTables.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

const Table = (props) => {
  const {
    children,
    className,
    containerClassName,
    ...other,
  } = props;

  const tableClasses = classNames(
    className,
    'bx--responsive-table'
  );

  const tableContainerClasses = classNames(
    containerClassName,
    'bx--responsive-table-container',
  );

  return (
    <div className={tableContainerClasses}>
      <table
        {...other}
        className={tableClasses}
        style={{
          borderCollapse: 'collapse',
          borderSpacing: 0,
        }}
      >
        {children}
      </table>
    </div>
  );
};


Table.propTypes = propTypes;

export default Table;

