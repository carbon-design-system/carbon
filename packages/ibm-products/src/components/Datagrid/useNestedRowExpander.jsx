/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { ChevronRight } from '@carbon/react/icons';
import cx from 'classnames';
import { pkg } from '../../settings';
import { useFocusRowExpander } from './useFocusRowExpander';
import { handleDynamicRowCheck } from './Datagrid/addons/stateReducer';
import { usePrefix } from '@carbon/react';

const blockClass = `${pkg.prefix}--datagrid`;

const useNestedRowExpander = (hooks) => {
  const carbonPrefix = usePrefix();
  const tempState = useRef(undefined);
  const lastExpandedRowIndex = useRef(undefined);
  const useInstance = (instance) => {
    tempState.current = instance;
  };

  useFocusRowExpander({
    instance: tempState?.current,
    lastExpandedRowIndex: lastExpandedRowIndex?.current,
    blockClass,
    activeElement: typeof document !== 'undefined' && document.activeElement,
  });

  const visibleColumns = (columns, state) => {
    const {
      getAsyncSubRows,
      dispatch,
      state: tableState,
    } = state.instance || {};
    const fetchingDynamicSubRows = !!tableState.dynamicRowSkeleton;
    const expanderColumn = {
      id: 'expander',
      Cell: ({ row }) => {
        const expanderButtonProps = {
          ...row.getToggleRowExpandedProps(),
          disabled: getAsyncSubRows && fetchingDynamicSubRows,
          onClick: async (event) => {
            // Prevents `onRowClick` from being called if `useOnRowClick` is included
            event.stopPropagation();
            row.toggleRowExpanded();
            lastExpandedRowIndex.current = row.id;
            if (!row.isExpanded) {
              try {
                handleDynamicRowCheck({
                  dispatch,
                  status: 'start',
                  rowId: row.id,
                  depth: row.depth,
                  index: row.index,
                });
                if (getAsyncSubRows) {
                  await getAsyncSubRows?.(row);
                }
                handleDynamicRowCheck({
                  dispatch,
                  status: 'finish',
                  rowId: row.id,
                });
              } catch (error) {
                console.log({ error });
              }
            }
          },
        };
        const {
          expanderButtonTitleExpanded = 'Collapse row',
          expanderButtonTitleCollapsed = 'Expand row',
        } = tempState?.current || {};
        const expanderTitle = row.isExpanded
          ? expanderButtonTitleExpanded
          : expanderButtonTitleCollapsed;
        return row.canExpand || getAsyncSubRows ? (
          <button
            type="button"
            aria-label={expanderTitle}
            className={cx(
              `${blockClass}__row-expander`,
              `${carbonPrefix}--btn`,
              `${carbonPrefix}--btn--ghost`
            )}
            {...expanderButtonProps}
          >
            <ChevronRight
              className={cx(`${blockClass}__expander-icon`, {
                [`${blockClass}__expander-icon--not-open`]: !row.isExpanded,
                [`${blockClass}__expander-icon--open`]: row.isExpanded,
              })}
            />
          </button>
        ) : null;
      },
      width: 48,
      disableResizing: true,
      disableSortBy: true,
      Header: '',
    };
    return [expanderColumn, ...columns];
  };
  hooks.visibleColumns.push(visibleColumns);
  hooks.useInstance.push(useInstance);
};

export default useNestedRowExpander;
