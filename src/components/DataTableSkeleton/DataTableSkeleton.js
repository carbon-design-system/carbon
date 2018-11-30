import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const DataTableSkeleton = ({
  rowCount,
  columnCount,
  zebra,
  compact,
  ...other
}) => {
  const dataTableSkeletonClasses = classNames({
    [`${prefix}--skeleton`]: true,
    [`${prefix}--data-table-v2`]: true,
    [`${prefix}--data-table-v2--zebra`]: zebra,
    [`${prefix}--data-table-v2--compact`]: compact,
  });

  const rowRepeat = rowCount - 1;
  const rows = Array(rowRepeat);
  const columnsArray = Array.from({ length: columnCount }, (_, index) => index);
  for (let i = 0; i < rowRepeat; i++) {
    rows[i] = (
      <tr key={i}>
        {columnsArray.map(j => (
          <td key={j} />
        ))}
      </tr>
    );
  }

  return (
    <table className={dataTableSkeletonClasses} {...other}>
      <thead>
        <tr>
          {columnsArray.map(i => (
            <th key={i} />
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {columnsArray.map(i => (
            <td key={i}>
              <span />
            </td>
          ))}
        </tr>
        {rows}
      </tbody>
    </table>
  );
};

DataTableSkeleton.propTypes = {
  /**
   * Specify the number of rows that you want to render in the skeleton state
   */
  rowCount: PropTypes.number,

  /**
   * Specify the number of columns that you want to render in the skeleton state
   */
  columnCount: PropTypes.number,

  /**
   * Optionally specify whether you want the DataTable to be zebra striped
   */
  zebra: PropTypes.bool,

  /**
   * Optionally specify whether you want the Skeleton to be rendered as a
   * compact DataTable
   */
  compact: PropTypes.bool,
};

DataTableSkeleton.defaultProps = {
  rowCount: 5,
  columnCount: 5,
  zebra: false,
  compact: false,
};

export default DataTableSkeleton;
