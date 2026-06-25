/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { MutableRefObject, RefObject, useEffect, useRef } from 'react';
import { VariableSizeList } from 'react-window';
import { TableBody } from '@carbon/react';
import { pkg } from '../../../settings';
import DatagridHead from './DatagridHead';
import { useResizeObserver } from '../../../global/js/hooks/useResizeObserver';
import { DataGridState, DatagridRow } from '../types';
import { useIsomorphicEffect } from '../../../global/js/hooks';

const blockClass = `${pkg.prefix}--datagrid`;

const rowSizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const defaultRowHeight = rowSizeMap.lg;

const DatagridVirtualBody = (datagridState: DataGridState) => {
  const {
    getTableBodyProps,
    rows,
    prepareRow,
    onScroll,
    innerListRef,
    tableHeight = 400,
    virtualHeight,
    listRef,
    rowSize,
    DatagridPagination,
    page,
    handleResize,
    gridRef,
    tableId,
    onVirtualScroll,
  } = datagridState;

  const headWrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const gridWidth = gridRef?.current?.clientWidth;
  /* istanbul ignore next */
  const handleVirtualGridResize = () => {
    const gridRefElement = gridRef?.current;
    // isHidden checks for an edge case where if the table is hidden by something like a Tab that the width can't be calculated to 0
    const isHidden = gridRefElement?.offsetParent === null;
    if (gridRefElement && !isHidden) {
      gridRefElement.style.width = gridRefElement?.clientWidth?.toString();
    }
  };

  useResizeObserver(gridRef as RefObject<HTMLElement>, handleVirtualGridResize);

  useEffect(() => {
    handleResize?.();
  }, [handleResize]);

  const rowHeight = (rowSize && rowSizeMap[rowSize]) || defaultRowHeight;

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [listRef, rowHeight]);

  const visibleRows = ((DatagridPagination && page) || rows) as DatagridRow[];
  const testRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // Sync the scrollLeft position of the virtual body to the table header
  useEffect(() => {
    const headWrapEl = document?.querySelector(
      `#${tableId} .${blockClass}__head-wrap`
    );

    // Syncs header scroll position when virtual body is scrolled
    function handleVirtualScrollX(event) {
      const virtualBody = event.target;
      if (headWrapEl) {
        headWrapEl.scrollLeft = virtualBody?.scrollLeft;
      }
    }

    // Syncs virtual body scroll position when header is scrolled
    function handleHeaderScrollX(event) {
      const header = event.target;
      if (testRef && testRef.current) {
        testRef.current.scrollLeft = header?.scrollLeft;
        // this prevents the scroll bar from over exceeding the vertical scroll bar compensation in the right
        header.scrollLeft = testRef.current.scrollLeft;
      }
    }

    const testRefValue = testRef?.current;
    testRefValue?.addEventListener('scroll', handleVirtualScrollX);
    headWrapEl?.addEventListener('scroll', handleHeaderScrollX);
    return () => {
      testRefValue?.removeEventListener('scroll', handleVirtualScrollX);
      headWrapEl?.removeEventListener('scroll', handleHeaderScrollX);
    };
  });

  useIsomorphicEffect(() => {
    if (headWrapRef.current && headWrapRef.current.style) {
      headWrapRef.current.style.width = `${gridWidth}px`;
      headWrapRef.current.style.overflow = `auto`;
    }
  }, [headWrapRef, gridWidth]);

  useIsomorphicEffect(() => {
    if (testRef?.current && testRef.current.style) {
      testRef.current.style.width = `${gridWidth}px`;
    }
  }, [testRef, gridWidth]);

  return (
    <>
      <div className={`${blockClass}__head-wrap`} ref={headWrapRef}>
        <DatagridHead {...datagridState} />
      </div>
      <TableBody
        {...getTableBodyProps({ role: undefined })}
        aria-live={undefined}
      >
        <VariableSizeList
          height={virtualHeight || tableHeight}
          itemCount={visibleRows.length}
          itemSize={(index) =>
            visibleRows[index]?.isExpanded
              ? (visibleRows[index].expandedContentHeight || 0) + rowHeight
              : rowHeight
          }
          estimatedItemSize={rowHeight}
          onScroll={onScroll}
          onItemsRendered={(e) => onVirtualScroll?.(e)}
          innerRef={innerListRef}
          outerRef={testRef}
          ref={listRef}
          className={`${blockClass}__virtual-scrollbar`}
        >
          {({ index, style }) => {
            const row = visibleRows[index];
            prepareRow(row);
            const { key } = row.getRowProps();
            return (
              <div
                ref={innerRef}
                style={{
                  ...style,
                }}
              >
                {row?.RowRenderer?.({ ...datagridState, row, key })}
              </div>
            );
          }}
        </VariableSizeList>
      </TableBody>
    </>
  );
};

export default DatagridVirtualBody;
