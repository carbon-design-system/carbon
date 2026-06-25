/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { isValidElement } from 'react';
import { TableRow, TableCell, SkeletonText, usePrefix } from '@carbon/react';
import { px } from '@carbon/layout';
import { selectionColumnId } from '../common-column-ids';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { DatagridAILabel } from './addons/AiLabel/DatagridAiLabel';
import { DataGridState } from '../types';

const blockClass = `${pkg.prefix}--datagrid`;

const rowHeights = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const DatagridRow = (datagridState: DataGridState) => {
  const {
    row,
    rows,
    rowSize,
    withNestedRows,
    prepareRow,
    key,
    tableId,
    withExpandedRows,
    withMouseHover,
    setMouseOverRowIndex,
    headers,
    visibleColumns,
    getAsyncSubRows,
  } = datagridState;

  const carbonPrefix = usePrefix();

  const getVisibleNestedRowCount = ({ isExpanded, subRows }) => {
    let size = 0;
    if (isExpanded && subRows) {
      size += subRows.length;
      subRows.forEach((child) => {
        size += getVisibleNestedRowCount(child);
      });
    }
    return size;
  };

  const hoverHandler = (event) => {
    if (!withNestedRows) {
      return;
    }
    const subRowCount = getVisibleNestedRowCount(row);
    const totalNestedRowIndicatorHeight = px(
      subRowCount * rowHeights[Number(rowSize)]
    );
    const hoverRow = event.target.closest(
      `.${blockClass}__carbon-row-expanded`
    );
    hoverRow?.classList.add(`${blockClass}__carbon-row-expanded-hover-active`);
    const rowExpanderButton = hoverRow?.querySelector(
      `.${blockClass}__row-expander`
    );
    const rowSizeValue = rowSize || 'lg';
    hoverRow?.style?.setProperty(
      `--${blockClass}--indicator-height`,
      totalNestedRowIndicatorHeight
    );
    hoverRow?.style?.setProperty(
      `--${blockClass}--row-height`,
      px(rowHeights[rowSizeValue])
    );
    hoverRow?.style?.setProperty(
      `--${blockClass}--indicator-offset-amount`,
      px(rowExpanderButton?.offsetLeft || 0)
    );
  };

  const focusRemover = () => {
    const elements = document.querySelectorAll(
      `#${tableId} .${blockClass}__carbon-row-expanded`
    );
    elements.forEach((el) => {
      el.classList.remove(`${blockClass}__carbon-row-expanded-hover-active`);
    });
  };

  const renderExpandedRow = () => {
    if (row.isExpanded) {
      prepareRow(row);
      return row?.RowExpansionRenderer?.({ ...datagridState, row });
    }
    return null;
  };

  const handleMouseLeave = (event) => {
    if (withMouseHover) {
      setMouseOverRowIndex?.(null);
    }
    const hoverRow = event.target.closest(
      `.${blockClass}__carbon-row-expanded`
    );
    hoverRow?.classList.remove(
      `${blockClass}__carbon-row-expanded-hover-active`
    );
  };

  const handleOnKeyUp = (event) => {
    if (!withNestedRows) {
      return;
    }
    if (event.key === 'Enter' || event.key === 'Space') {
      focusRemover();
      hoverHandler(event);
    }
  };

  const setAdditionalRowProps = () => {
    if (withNestedRows || withExpandedRows) {
      return {
        'data-nested-row-id': row.id,
      };
    }
    return {};
  };

  const { className, ...rowProps } = row.getRowProps({ role: undefined });
  const foundAIRow = rows.some(
    (r) =>
      isValidElement(r?.original?.aiLabel) || isValidElement(r?.original?.slug)
  );

  const rowClassNames = cx(`${blockClass}__carbon-row`, {
    [`${blockClass}__carbon-row-expanded`]: row.isExpanded,
    [`${blockClass}__carbon-row-expandable`]: row.canExpand,
    [`${blockClass}__carbon-row-expandable--async`]:
      getAsyncSubRows && row.depth > 0,
    [`${carbonPrefix}--data-table--selected`]: row.isSelected,
    [`${blockClass}__slug--row`]: isValidElement(row?.original?.slug),
    [`${blockClass}__ai-label--row`]: isValidElement(row?.original?.aiLabel),
  });

  const withActionsColumn = headers
    ? !!headers.filter((header) => header.isAction).length
    : false;

  const rowKey = !row.isSkeleton ? key : row.skeletonKey;
  return (
    <React.Fragment key={`${rowKey}__${key}__row--fragment`}>
      <TableRow
        {...rowProps}
        className={cx(rowClassNames, className)}
        key={rowKey}
        onMouseEnter={hoverHandler}
        onMouseLeave={handleMouseLeave}
        onFocus={hoverHandler}
        onBlur={focusRemover}
        onKeyUp={handleOnKeyUp}
        {...setAdditionalRowProps()}
      >
        {foundAIRow ? (
          row?.original?.aiLabel ? (
            <td
              className={cx(`${blockClass}__table-row-ai-enabled`, {
                [`${blockClass}__ai-label--expanded`]: row.isExpanded,
              })}
            >
              <DatagridAILabel aiLabel={row?.original?.aiLabel} />
            </td>
          ) : row?.original?.slug ? (
            <td
              className={cx(`${blockClass}__table-row-ai-enabled`, {
                [`${blockClass}__slug--expanded`]: row.isExpanded,
              })}
            >
              <DatagridAILabel aiLabel={row?.original?.slug} />
            </td>
          ) : (
            <td className={`${blockClass}__table-row-ai-spacer`} />
          )
        ) : null}
        {row.cells.map((cell, index) => {
          const cellProps = cell.getCellProps({ role: undefined });
          const { style, children, ...restProps } = cellProps as any;
          const columnClassname = cell?.column?.className;
          const content = children || (
            <>
              {!row.isSkeleton && cell.render('Cell')}
              {row.isSkeleton && <SkeletonText />}
            </>
          );
          if (cell?.column?.id === selectionColumnId) {
            // directly render component without the wrapping TableCell
            return cell.render('Cell', { key: cell.column.id });
          }
          const associatedHeader = headers?.filter(
            (h) => h.id === cell.column.id
          );
          const lastVisibleIndex = withActionsColumn ? 2 : 1;
          const lastVisibleFlexStyle =
            index === visibleColumns.length - lastVisibleIndex
              ? '1 0 auto'
              : '0 0 auto';
          if (style) {
            style.flex = lastVisibleFlexStyle;
          }
          return (
            <TableCell
              className={cx(
                `${blockClass}__cell`,
                {
                  [`${blockClass}__expandable-row-cell`]:
                    (row.canExpand || getAsyncSubRows) && index === 0,
                  [`${blockClass}__expandable-row-cell--is-expanded`]:
                    row.isExpanded && index === 0,
                  [`${blockClass}__slug--cell`]:
                    associatedHeader &&
                    associatedHeader.length &&
                    isValidElement(associatedHeader[0]?.slug),
                  [`${blockClass}__ai-label--cell`]:
                    associatedHeader &&
                    associatedHeader.length &&
                    isValidElement(associatedHeader[0]?.aiLabel),
                },
                columnClassname
              )}
              {...restProps}
              // eslint-disable-next-line react/forbid-component-props
              style={style}
              key={cell.column.id}
            >
              {content}
            </TableCell>
          );
        })}
      </TableRow>
      {renderExpandedRow?.() || undefined}
    </React.Fragment>
  );
};

export default DatagridRow;
