import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Table = ({ zebra, className, children, ...other }) => {
  const componentClass = cx('bx--data-table-v2', className, {
    'bx--data-table-v2--zebra': zebra,
  });
  return (
    <table {...other} className={componentClass}>
      {children}
    </table>
  );
};

Table.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * `true` to add zebra striping.
   */
  zebra: PropTypes.bool,
};

Table.defaultProps = {
  zebra: true,
};

export default Table;
