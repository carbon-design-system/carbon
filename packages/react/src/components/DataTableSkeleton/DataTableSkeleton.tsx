/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type FunctionComponent, TableHTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface DataTableSkeletonHeader {
  /**
   * Specify header label
   */
  header: React.ReactNode;

  /**
   * Optionally specify header key
   */
  key?: string;
}

export interface DataTableSkeletonProps
  extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Specify the number of columns that you want to render in the skeleton state
   */
  columnCount?: number;

  /**
   * Optionally specify whether you want the Skeleton to be rendered as a
   * compact DataTable
   */
  compact?: boolean;

  /**
   * Optionally specify the displayed headers
   */
  headers?: DataTableSkeletonHeader[];

  /**
   * Specify the number of rows that you want to render in the skeleton state
   */
  rowCount?: number;

  /**
   * Specify if the table header should be rendered as part of the skeleton.
   */
  showHeader?: boolean;

  /**
   * Specify if the table toolbar should be rendered as part of the skeleton.
   */
  showToolbar?: boolean;

  /**
   * Optionally specify whether you want the DataTable to be zebra striped
   */
  zebra?: boolean;
  /**
   * Optionally specify whether you want the DataTable to be styled
   */
  className?: string;
}

const DataTableSkeleton: FunctionComponent<DataTableSkeletonProps> = ({
  headers,
  rowCount = 5,
  columnCount = 5,
  zebra = false,
  compact = false,
  className,
  showHeader = true,
  showToolbar = true,
  ...rest
}) => {
  const prefix = usePrefix();
  const dataTableSkeletonClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--data-table`]: true,
    [`${prefix}--data-table--zebra`]: zebra,
    [`${prefix}--data-table--compact`]: compact,
  });

  const rowRepeat = rowCount;
  const rows = Array(rowRepeat);
  const columnsArray = Array.from({ length: columnCount }, (_, index) => index);
  for (let i = 0; i < rowRepeat; i++) {
    rows[i] = (
      <tr key={i}>
        {columnsArray.map((j) => (
          <td key={j}>
            <span />
          </td>
        ))}
      </tr>
    );
  }

  return (
    <div className={`${prefix}--skeleton ${prefix}--data-table-container`}>
      {showHeader ? (
        <div className={`${prefix}--data-table-header`}>
          <div className={`${prefix}--data-table-header__title`} />
          <div className={`${prefix}--data-table-header__description`} />
        </div>
      ) : null}
      {showToolbar ? (
        <section
          aria-label="data table toolbar"
          className={`${prefix}--table-toolbar`}>
          <div className={`${prefix}--toolbar-content`}>
            <span
              className={`${prefix}--skeleton ${prefix}--btn ${prefix}--btn--sm`}
            />
          </div>
        </section>
      ) : null}
      <table className={dataTableSkeletonClasses} {...rest}>
        <thead>
          <tr>
            {columnsArray.map((i) => (
              <th key={i}>
                {headers ? (
                  <div className={`${prefix}--table-header-label`}>
                    {headers[i]?.header}
                  </div>
                ) : (
                  <span />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

DataTableSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the number of columns that you want to render in the skeleton state
   */
  columnCount: PropTypes.number,

  /**
   * Optionally specify whether you want the Skeleton to be rendered as a
   * compact DataTable
   */
  compact: PropTypes.bool,

  /**
   * Optionally specify the displayed headers
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
    }).isRequired
  ),

  /**
   * Specify the number of rows that you want to render in the skeleton state
   */
  rowCount: PropTypes.number,

  /**
   * Specify if the table header should be rendered as part of the skeleton.
   */
  showHeader: PropTypes.bool,

  /**
   * Specify if the table toolbar should be rendered as part of the skeleton.
   */
  showToolbar: PropTypes.bool,

  /**
   * Optionally specify whether you want the DataTable to be zebra striped
   */
  zebra: PropTypes.bool,
};

export default DataTableSkeleton;
