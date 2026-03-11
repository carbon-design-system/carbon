/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode, useMemo, type HTMLAttributes } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { TableContext } from './TableContext';
import { Heading, Section } from '../Heading';

export interface TableContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Specify if the entire table has AI generated contents
   */
  aiEnabled?: boolean;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableContainer` component
   */
  decorator?: ReactNode;
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
  aiEnabled,
  className,
  children,
  decorator,
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
      [`${prefix}--data-table-container--ai-enabled`]: aiEnabled,
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
      <Section {...rest} className={tableContainerClasses}>
        {(title || description || decorator) && (
          <div
            className={cx(`${prefix}--data-table-header`, {
              [`${prefix}--data-table-header__with-decorator`]: decorator,
              [`${prefix}--data-table-header__with-decorator--standalone`]:
                decorator && !title && !description,
            })}>
            {(title || description) && (
              <div className={`${prefix}--data-table-header__content`}>
                {title && (
                  <Heading
                    className={`${prefix}--data-table-header__title`}
                    id={titleId}>
                    {title}
                  </Heading>
                )}
                {description && (
                  <p
                    className={`${prefix}--data-table-header__description`}
                    id={descriptionId}>
                    {description}
                  </p>
                )}
              </div>
            )}
            {decorator && (
              <div className={`${prefix}--data-table-header__decorator`}>
                {decorator}
              </div>
            )}
          </div>
        )}
        {children}
      </Section>
    </TableContext.Provider>
  );
};

TableContainer.propTypes = {
  /**
   * Specify if the entire table has AI generated contents
   */
  aiEnabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableContainer` component
   */
  decorator: PropTypes.node,
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
