/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useState,
  useEffect,
  isValidElement,
  MutableRefObject,
} from 'react';
import cx from 'classnames';
import { TableHeader, TableRow } from '@carbon/react';
import { px } from '@carbon/layout';
import { selectionColumnId } from '../common-column-ids';
import { pkg } from '../../../settings';
import {
  handleColumnResizeEndEvent,
  handleColumnResizingEvent,
} from './addons/stateReducer';
import { getNodeTextContent } from '../../../global/js/utils/getNodeTextContent';
import { DatagridAILabel } from './addons/AiLabel/DatagridAiLabel';
import { useInitialColumnSort } from '../useInitialColumnSort';
import {
  DataGridHeader,
  DataGridHeaderGroup,
  DataGridState,
  DataGridTableInstance,
  DatagridTableHooks,
  ResizeHeaderProps,
} from '../types';

const blockClass = `${pkg.prefix}--datagrid`;

const getAccessibilityProps = (header: DataGridHeader) => {
  const props = {};
  const content = getNodeTextContent(header.Header);
  if (!content) {
    props['aria-hidden'] = true;
  }
  return props;
};

const ResizeHeader = ({
  resizerProps,
  header,
  handleOnMouseDownResize,
  originalCol,
  columnWidths,
  datagridState,
  incrementAmount,
  minWidth,
  dispatch,
  onColResizeEnd,
  resizerAriaLabel,
  isFetching,
}: ResizeHeaderProps) => {
  const { ...headerProps } = resizerProps;
  const mouseDownHandler = (evt) => {
    handleOnMouseDownResize?.(evt, resizerProps);
  };
  const mouseUpHandler = () => {
    handleColumnResizeEndEvent(dispatch, onColResizeEnd, header?.id, true);
  };
  const keyDownHandler = (evt) => {
    const { key } = evt;
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const originalColMinWidth = originalCol?.minWidth || 90;
      const currentColumnWidth =
        (header?.id && columnWidths?.[header?.id]) ||
        (datagridState?.isTableSortable &&
        Number(originalCol?.width) < originalColMinWidth
          ? originalColMinWidth
          : originalCol?.width);
      if (key === 'ArrowLeft') {
        if (
          currentColumnWidth - incrementAmount >
          Math.max(Number(minWidth), 50)
        ) {
          const newWidth = currentColumnWidth - incrementAmount;
          handleColumnResizingEvent(dispatch, header, newWidth, true);
        }
      }
      if (key === 'ArrowRight') {
        const newWidth = currentColumnWidth + incrementAmount;
        handleColumnResizingEvent(dispatch, header, newWidth, true);
      }
    }
  };
  const keyUpHandler = () => {
    handleColumnResizeEndEvent(dispatch, onColResizeEnd, header?.id, true);
  };
  return (
    <>
      <input
        {...headerProps}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onKeyDown={keyDownHandler}
        onKeyUp={keyUpHandler}
        className={`${blockClass}__col-resizer-range`}
        type="range"
        defaultValue={originalCol?.width}
        aria-label={resizerAriaLabel || 'Resize column'}
        disabled={isFetching}
      />
      <span
        role="separator"
        className={`${blockClass}__col-resize-indicator`}
      />
    </>
  );
};

const getAriaSortValue = (col, datagridState) => {
  const {
    ascendingSortableLabelText,
    descendingSortableLabelText,
    defaultSortableLabelText,
  } = datagridState;
  if (!col) {
    return;
  }
  const { isSorted, isSortedDesc } = col;
  if (!isSorted) {
    return defaultSortableLabelText;
  }
  if (isSorted && !isSortedDesc) {
    return ascendingSortableLabelText;
  }
  if (isSorted && isSortedDesc) {
    return descendingSortableLabelText;
  }
};

const HeaderRow = (
  datagridState: DataGridState,
  headRef: MutableRefObject<HTMLDivElement>,
  headerGroup: DataGridHeaderGroup
) => {
  const { resizerAriaLabel, isTableSortable, rows, isFetching, headers } =
    datagridState;
  useInitialColumnSort(datagridState);
  // Used to measure the height of the table and uses that value
  // to display a vertical line to indicate the column you are resizing
  useEffect(() => {
    const { tableId } = datagridState;
    const gridElement: HTMLDivElement | null = document.querySelector(
      `#${tableId}`
    );
    const tableElement = gridElement?.querySelector('table');
    const headerRowElement: HTMLDivElement | null = document.querySelector(
      `#${tableId} .${blockClass}__head`
    );
    let scrollBuffer = 2;
    if (tableElement) {
      const hasHorizontalScrollbar =
        tableElement?.scrollWidth > tableElement?.clientWidth;

      if (hasHorizontalScrollbar) {
        scrollBuffer = 18;
      }
    }
    const tableToolbar: HTMLDivElement | null =
      gridElement?.querySelector(`.${blockClass}__table-toolbar`) || null;
    const tableToolbarHeight = tableToolbar?.offsetHeight || 0;
    const setCustomValues = ({ rowHeight, gridHeight }) => {
      headerRowElement?.style.setProperty(
        `--${blockClass}--row-height`,
        px(rowHeight)
      );
      headerRowElement?.style.setProperty(
        `--${blockClass}--grid-height`,
        px(gridHeight - scrollBuffer - tableToolbarHeight)
      );
      headerRowElement?.style.setProperty(
        `--${blockClass}--header-height`,
        px(headerRowElement.offsetHeight)
      );
    };
    setCustomValues({
      gridHeight: gridElement?.offsetHeight,
      rowHeight: headerRowElement?.clientHeight,
    });
  }, [datagridState.rowSize, datagridState.tableId, datagridState]);

  const [incrementAmount] = useState(2);

  const handleOnMouseDownResize = (event, resizeProps) => {
    const { onMouseDown = () => {} } = { ...resizeProps };
    // When event.button is 2, that is a right click
    // and we do not want to resize
    if (event.button === 2 || event.ctrlKey) {
      event.target.blur();
      return;
    }
    onMouseDown?.(event);
  };

  const { className: headerGroupClassName, ...headerGroupProps } =
    headerGroup.getHeaderGroupProps({ role: undefined });

  const renderAILabel = (aiLabel) => {
    if (isTableSortable) {
      return;
    }
    return <DatagridAILabel aiLabel={aiLabel} />;
  };

  const foundAIRow = rows.some(
    (r) =>
      isValidElement(r?.original?.aiLabel) || isValidElement(r?.original?.slug)
  );
  const { key, ...rowProps } = headerGroupProps;
  const withActionsColumn = headers
    ? !!headers.filter((header) => header.isAction).length
    : false;

  return (
    <TableRow
      key={key}
      {...rowProps}
      className={cx(`${blockClass}__head`, headerGroupClassName)}
      {...{
        ref: headRef,
      }}
    >
      {foundAIRow ? <th scope="col" aria-hidden="false" /> : null}
      {datagridState?.headers
        ?.filter(({ isVisible }) => isVisible)
        ?.map((header, index) => {
          if (header.id === selectionColumnId) {
            // render directly without the wrapper TableHeader
            return header.render('Header', { key: header.id });
          }
          const { minWidth } = header || 50;
          const { visibleColumns, state, dispatch, onColResizeEnd } =
            datagridState;
          const { columnResizing } = state;
          const { columnWidths } = columnResizing || {};
          const originalCol = visibleColumns[index];
          const { ...headerProps } = header.getHeaderProps({ role: undefined });

          const resizerProps = header?.getResizerProps?.({ role: undefined });
          const headerStyle = headerProps?.style;
          const lastVisibleIndex = withActionsColumn ? 2 : 1;
          const isLastVisibleColumn =
            index === visibleColumns.length - lastVisibleIndex;

          if (headerStyle) {
            Object.assign(headerStyle, {
              flex: isLastVisibleColumn ? '1 1 0' : '0 0 auto',
              overflow: isLastVisibleColumn ? 'hidden' : headerStyle.overflow,
            });
          }

          return (
            <TableHeader
              {...headerProps}
              className={cx(
                header?.className,
                {
                  [`${blockClass}__resizableColumn`]: resizerProps,
                  [`${blockClass}__isResizing`]: header?.isResizing,
                  [`${blockClass}__sortableColumn`]:
                    datagridState.isTableSortable && header.id !== 'spacer',
                  [`${blockClass}__isSorted`]: header?.isSorted,
                  [`${blockClass}__header-actions-column`]: header?.isAction,
                  [`${blockClass}__with-slug`]:
                    header.slug && React.isValidElement(header?.slug),
                  [`${blockClass}__with-ai-label`]:
                    header.aiLabel && React.isValidElement(header?.aiLabel),
                },
                headerProps.className
              )}
              key={header.id}
              aria-hidden={header.id === 'spacer' && 'true'}
              aria-sort={
                header.canSort ? getAriaSortValue(header, datagridState) : ''
              }
              {...getAccessibilityProps(header)}
            >
              {header.render('Header')}
              {renderAILabel(header.aiLabel || header.slug)}
              {resizerProps && !header.isAction && (
                <ResizeHeader
                  {...{
                    resizerProps,
                    header,
                    handleOnMouseDownResize,
                    originalCol,
                    columnWidths,
                    datagridState,
                    incrementAmount,
                    minWidth,
                    dispatch,
                    onColResizeEnd,
                    resizerAriaLabel,
                    isFetching,
                  }}
                />
              )}
            </TableHeader>
          );
        })}
    </TableRow>
  );
};

const useHeaderRow = (hooks: DatagridTableHooks) => {
  const useInstance = (instance: DataGridTableInstance) => {
    Object.assign(instance, { HeaderRow });
  };
  hooks.useInstance.push(useInstance);
};

export default useHeaderRow;
