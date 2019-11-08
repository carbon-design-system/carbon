/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const DataTableSkeleton = ({
  rowCount,
  columnCount,
  zebra,
  compact,
  headers,
  className,
  ...rest
}) => {
  const dataTableSkeletonClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--data-table`]: true,
    [`${prefix}--data-table--zebra`]: zebra,
    [`${prefix}--data-table--compact`]: compact,
  });

  let normalizedHeaders;

  if (headers[0] === Object(headers[0]) && !Array.isArray(headers[0])) {
    normalizedHeaders = headers.map(current => current.header);
  } else {
    normalizedHeaders = headers;
  }

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
    <table className={dataTableSkeletonClasses} {...rest}>
      <thead>
        <tr>
          {columnsArray.map(i => (
            <th key={i}>{normalizedHeaders[i]}</th>
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

  /**
   * Optionally specify the displayed headers
   */
  headers: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      key: PropTypes.string,
      header: PropTypes.node,
    }),
  ]),

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

DataTableSkeleton.defaultProps = {
  rowCount: 5,
  columnCount: 5,
  zebra: false,
  compact: false,
  headers: [],
};

export default DataTableSkeleton;
