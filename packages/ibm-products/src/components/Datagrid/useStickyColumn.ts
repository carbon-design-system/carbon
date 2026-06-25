/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { useIsomorphicEffect } from '../../global/js/hooks';
import { debounce } from '../../global/js/utils/debounce';
import cx from 'classnames';
import { pkg } from '../../settings';
import {
  CellPropGetter,
  HeaderPropGetter,
  Hooks,
  TableBodyPropGetter,
  TableInstance,
} from 'react-table';
import {
  DataGridState,
  DataGridTableProps,
  DatagridColumn,
  DataGridData,
} from './types';

const blockClass = `${pkg.prefix}--datagrid`;

const styleClassPrefix = `${blockClass}__right-sticky-column`;
const leftStickyStyleClassPrefix = `${blockClass}__left-sticky-column`;
const OFFSET_SCROLL_CLASS = `${styleClassPrefix}-offset-scroll`;

const useStickyColumn = (hooks: Hooks) => {
  const tableBodyRef = useRef<HTMLElement | undefined>(undefined);
  const stickyHeaderCellRef = useRef<HTMLElement | undefined>(undefined);
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    setWindowSize(window?.innerWidth);
  }, []);

  useIsomorphicEffect(() => {
    /* istanbul ignore next */
    function updateSize() {
      setWindowSize(window.innerWidth);
    }
    /* istanbul ignore next */
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  hooks.getCellProps.push(
    changeProps.bind(null, 'cell', null, windowSize) as CellPropGetter<any>
  );
  hooks.getHeaderProps.push(
    changeProps.bind(
      null,
      'header',
      stickyHeaderCellRef,
      windowSize
    ) as HeaderPropGetter<any>
  );
  hooks.getTableBodyProps.push(
    addTableBodyProps.bind(null, tableBodyRef) as TableBodyPropGetter<any>
  );
  hooks.getHeaderGroupProps.push((props) => [
    props,
    {
      style: {
        ...props.style,
        minWidth: 'unset', // unset the min-width calculated by sum of all column min-width
      },
    },
  ]);
  const useEventListener = (instance: TableInstance & DataGridState) => {
    useEffect(() => {
      const tableBodyElement = tableBodyRef.current;
      const headerCellElement = stickyHeaderCellRef?.current;
      /* istanbul ignore next */
      if (hasVertScroll(tableBodyElement) && headerCellElement) {
        headerCellElement?.classList?.add(OFFSET_SCROLL_CLASS);
      }
      const boundListener = debounce(
        onBodyResize.bind(null, tableBodyElement, headerCellElement),
        250
      );
      /* istanbul ignore next */
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', boundListener);
      }
      return () => {
        /* istanbul ignore next */
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', boundListener);
        }
      };
    }, [instance.rows, instance.isFetching]);
    useEffect(() => {
      const tableBodyElement = tableBodyRef.current;
      const headerCellElement = stickyHeaderCellRef.current;
      const listener = (evt) => {
        toggleStickyShadow(evt.target, headerCellElement);
      };
      toggleStickyShadow(tableBodyElement, headerCellElement);
      if (tableBodyElement) {
        tableBodyElement?.addEventListener('scroll', listener);
      }
      return () => {
        if (tableBodyElement) {
          tableBodyElement.removeEventListener('scroll', listener);
        }
      };
    }, [instance.rows, instance.isFetching]);
  };
  const useCheckScroll = (instance) => {
    const tableBodyElement = tableBodyRef.current;
    const headerCellElement = stickyHeaderCellRef.current;
    useEffect(() => {
      onBodyResize(tableBodyElement, headerCellElement);
    }, [instance.rows, headerCellElement, tableBodyElement]);
  };
  hooks.useInstance.push(useEventListener as (instance: TableInstance) => void);
  hooks.useInstance.push(useCheckScroll);
  hooks.useInstance.push((instance) => {
    Object.assign(instance, {
      withStickyColumn: true,
    });
  });
  hooks.useInstance.push((instance: TableInstance) => {
    // sticky column is defined by consumer
    // it will always comes after the spacer which is defined by useFlexResize
    // swap them here to use the spacer to push
    // sticky column to the right when there are few
    // columns defined
    const newColumns = instance.visibleColumns;
    let spacerIdx = newColumns.findIndex((col) => col.id === 'spacer');
    let stickyIdx = newColumns.findIndex(
      (col) => (col as DatagridColumn).sticky === 'right'
    );
    if (spacerIdx >= 0 && stickyIdx >= 0 && stickyIdx < spacerIdx) {
      const temp = newColumns[spacerIdx];
      newColumns[spacerIdx] = newColumns[stickyIdx];
      newColumns[stickyIdx] = temp;
    }
    const newHeaders = instance.headers as DatagridColumn[];
    spacerIdx = newHeaders.findIndex((col) => col.id === 'spacer');
    stickyIdx = newHeaders.findIndex(
      (col) => (col as DatagridColumn).sticky === 'right'
    );

    if (spacerIdx >= 0 && stickyIdx >= 0 && stickyIdx < spacerIdx) {
      const temp = newHeaders[spacerIdx];
      newHeaders[spacerIdx] = newHeaders[stickyIdx];
      newHeaders[spacerIdx].canResize = false;
      newHeaders[spacerIdx].disableResizing = true;
      delete newHeaders[spacerIdx].getResizerProps;
      newHeaders[stickyIdx] = temp;
    }
  });
};

const addTableBodyProps = (
  tableBodyRef: HTMLElement | MutableRefObject<HTMLElement | undefined>,
  props: DataGridTableProps
) => [
  props,
  {
    ref: tableBodyRef,
  },
];

const changeProps = (
  elementName: string,
  headerCellRef: HTMLElement | MutableRefObject<HTMLElement | undefined> | null,
  windowSize: number | undefined,
  props: DataGridTableProps,
  data: DataGridData
) => {
  const column = data.column || data.cell?.column;
  if (column?.sticky === 'right') {
    return [
      props,
      {
        className: cx({
          [`${styleClassPrefix}-${elementName}`]: true,
          [`${blockClass}__resizableColumn`]: false,
          [`${blockClass}__sortableColumn`]: false,
        }),
        ...(headerCellRef && {
          ref: headerCellRef,
        }),
      },
    ];
  }
  if (column?.sticky === 'left') {
    return [
      props,
      {
        className: cx({
          [`${leftStickyStyleClassPrefix}-${elementName}`]:
            windowSize && windowSize > 671,
          [`${leftStickyStyleClassPrefix}-${elementName}--with-extra-select-column`]:
            data?.instance?.withSelectRows && windowSize && windowSize > 671,
        }),
        ...(headerCellRef && {
          ref: headerCellRef,
        }),
      },
    ];
  }
  return [props];
};

const onBodyResize = (
  tableBodyEle: HTMLElement | undefined,
  headerCellEle: HTMLElement | undefined
) => {
  if (headerCellEle) {
    /* istanbul ignore next */
    if (hasVertScroll(tableBodyEle)) {
      headerCellEle.classList.add(OFFSET_SCROLL_CLASS);
    } else {
      headerCellEle.classList.remove(OFFSET_SCROLL_CLASS);
    }
    toggleStickyShadow(tableBodyEle, headerCellEle);
  }
};

const toggleStickyShadow = (
  tableBodyEle: HTMLElement | undefined,
  headerCellEle: HTMLElement | undefined
) => {
  /* istanbul ignore next */
  if (tableBodyEle && headerCellEle) {
    const isScrolledToRight =
      tableBodyEle.scrollLeft + tableBodyEle.clientWidth ===
      tableBodyEle.scrollWidth;
    if (isScrolledToRight) {
      headerCellEle.classList.add(`${blockClass}__sticky-noShadow`);
      tableBodyEle.classList.add(`${blockClass}__sticky-column-noShadow`);
    } else {
      headerCellEle.classList.remove(`${blockClass}__sticky-noShadow`);
      tableBodyEle.classList.remove(`${blockClass}__sticky-column-noShadow`);
    }
  }
};
const hasVertScroll = (element: HTMLElement | undefined) => {
  /* istanbul ignore next */
  if (!element) {
    return false;
  }
  const { scrollHeight, clientHeight } = element;
  return scrollHeight > clientHeight;
};

export default useStickyColumn;
