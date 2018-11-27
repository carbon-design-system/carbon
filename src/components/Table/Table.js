import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { settings } from 'carbon-components';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

const Table = props => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The `Table` component is being updated in the next release of ' +
        '`carbon-components-react`. Please use `DataTable.Table` instead.'
    );
    didWarnAboutDeprecation = true;
  }
  const { children, className, containerClassName, ...other } = props;

  const tableClasses = classNames(className, `${prefix}--responsive-table`);

  const tableContainerClasses = classNames(
    containerClassName,
    `${prefix}--responsive-table-container`
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
  /**
   * Provide the contents of your Table
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the <table> node
   */
  className: PropTypes.string,

  /**
   * Specify an optional className to be applied to the container node
   */
  containerClassName: PropTypes.string,
};

export default Table;
