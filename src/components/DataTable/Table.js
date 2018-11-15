import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Table = ({
  zebra,
  className,
  children,
  short,
  shouldShowBorder,
  ...other
}) => {
  const componentClass = cx('bx--data-table-v2', className, {
    'bx--data-table-v2--zebra': zebra,
    'bx--data-table-v2--short': short,
    'bx--data-table-v2--no-border': !shouldShowBorder,
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

  /**
   * `true` for short data table.
   */
  short: PropTypes.bool,

  /**
   * `true` for data table without borders.
   */
  shouldShowBorder: PropTypes.bool,
};

Table.defaultProps = {
  zebra: true,
  short: false,
  shouldShowBorder: true,
};

export default Table;
