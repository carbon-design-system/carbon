/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ReactAttr } from '../../types/common';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { TableContext } from './TableContext';

export interface TableContainerProps
  extends Omit<ReactAttr<HTMLDivElement>, 'title'> {
  /**
   * Optional description text for the Table
   */
  description?: React.ReactNode;
  /**
   * Specify whether the table should have a sticky header
   */
  stickyHeader?: boolean;
  /**
   * If true, will use a width of 'fit-content' to match the inner table width
   */
  useStaticWidth?: boolean;
  /**
   * Provide a title for the Table
   */
  title?: React.ReactNode;
}

const TableContainer = ({
  className,
  children,
  title,
  description,
  stickyHeader,
  useStaticWidth,
  ...rest
}: TableContainerProps) => {
  const baseId = useId('tc');
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const prefix = usePrefix();
  const tableContainerClasses = cx(
    className,
    `${prefix}--data-table-container`,
    {
      [`${prefix}--data-table--max-width`]: stickyHeader,
      [`${prefix}--data-table-container--static`]: useStaticWidth,
    }
  );
  const value = useMemo(() => {
    return {
      titleId: title ? titleId : undefined,
      descriptionId: description ? descriptionId : undefined,
    };
  }, [title, description, titleId, descriptionId]);

  return (
    <TableContext.Provider value={value}>
      <div {...rest} className={tableContainerClasses}>
        {title && (
          <div className={`${prefix}--data-table-header`}>
            <h4 className={`${prefix}--data-table-header__title`} id={titleId}>
              {title}
            </h4>
            <p
              className={`${prefix}--data-table-header__description`}
              id={descriptionId}>
              {description}
            </p>
          </div>
        )}
        {children}
      </div>
    </TableContext.Provider>
  );
};

TableContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Optional description text for the Table
   */
  description: PropTypes.node,

  /**
   * Specify whether the table should have a sticky header
   */
  stickyHeader: PropTypes.bool,

  /**
   * Provide a title for the Table
   */
  title: PropTypes.node,

  /**
   * If true, will use a width of 'fit-content' to match the inner table width
   */
  useStaticWidth: PropTypes.bool,
};

export default TableContainer;
